import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { User } from "../../types";
import { Avatar } from "@heroui/avatar";

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const UserCard = ({ user, isFavorite, onToggleFavorite }: UserCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-col items-center p-4">
        <Avatar
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 mb-4"
        />
        <h3 className="text-xl font-semibold truncate">{user.login}</h3>
      </CardHeader>

      <CardBody className="flex flex-col items-center gap-3 p-4">
        <Link
          href={`/users/${user.login}`}
          className="text-blue-500 hover:underline"
        >
          View Profile
        </Link>

        <Button
          onPress={onToggleFavorite}
          color="default"
          size="sm"
          variant={isFavorite ? "solid" : "bordered"}
          className="w-full"
        >
          {isFavorite ? "★ Unfavorite" : "☆ Favorite"}
        </Button>
      </CardBody>
    </Card>
  );
};

export default UserCard;
