import React, { useState, useEffect } from "react";
import useGitHubUsers from "../hooks/useGitHubUsers";
import SearchBar from "../components/SearchBar/SearchBar";
import UserCard from "../components/UserCard/UserCard";
import UserCardSkeleton from "../components/UserCardSkeleton/UserCardSkeleton";
import DefaultLayout from "@/layouts/default";
import { useStore } from "../store/store";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { users, loading, error, fetchUsers } = useGitHubUsers();
  const { favorites, addFavorite, removeFavorite } = useStore();

  useEffect(() => {
    fetchUsers(searchTerm);
  }, []);

  const handleSearch = () => {
    fetchUsers(searchTerm);
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">GitHub Users</h1>

        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
        />

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <UserCardSkeleton key={index} />
              ))
            : users.map((user) => (
                <UserCard
                  key={user.login}
                  user={user}
                  isFavorite={favorites.includes(user.login)}
                  onToggleFavorite={() =>
                    favorites.includes(user.login)
                      ? removeFavorite(user.login)
                      : addFavorite(user.login)
                  }
                />
              ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
