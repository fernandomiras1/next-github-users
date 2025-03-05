import { GetServerSideProps } from "next";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";
import { useStore } from "../../store/store";
import { User } from "../../types";

interface UserDetailProps {
  user: User;
}

const UserDetailPage = ({ user }: UserDetailProps) => {
  const { favorites, addFavorite, removeFavorite } = useStore();
  const isFavorite = favorites.includes(user.login);

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to Search
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <Avatar
              src={user.avatar_url}
              alt={user.login}
              className="w-48 h-48 border-4 border-gray-200 rounded-full"
            />
            <Button
              onPress={() =>
                isFavorite
                  ? removeFavorite(user.login)
                  : addFavorite(user.login)
              }
              size="sm"
              color="default"
              variant={isFavorite ? "solid" : "bordered"}
              className="w-full"
            >
              {isFavorite ? "★ Unfavorite" : "☆ Add to Favorites"}
            </Button>
          </div>

          {/* User Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {user.name || user.login}
              </h1>
              {user.login !== user.name?.toLowerCase() && (
                <p className="text-xl text-gray-400">@{user.login}</p>
              )}
            </div>

            {user.bio && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-2">Bio</h3>
                <p className="text-gray-300 leading-relaxed">{user.bio}</p>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{user.public_repos}</p>
                <p className="text-gray-400">Repositories</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{user.followers}</p>
                <p className="text-gray-400">Followers</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{user.following}</p>
                <p className="text-gray-400">Following</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.company && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🏢</span>
                  <p>{user.company}</p>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📍</span>
                  <p>{user.location}</p>
                </div>
              )}
              {user.blog && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🌐</span>
                  <a
                    href={user.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-gray-400">🔗</span>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) return { notFound: true };

    const user = await res.json();
    return {
      props: {
        user: {
          login: user.login,
          name: user.name,
          avatar_url: user.avatar_url,
          bio: user.bio,
          public_repos: user.public_repos,
          followers: user.followers,
          following: user.following,
          html_url: user.html_url,
          company: user.company,
          blog: user.blog,
          location: user.location,
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
