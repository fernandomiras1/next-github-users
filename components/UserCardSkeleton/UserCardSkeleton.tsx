import { Card, CardBody, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const UserCardSkeleton = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-col items-center p-4">
        <Skeleton className="w-24 h-24 mb-4 rounded-full" />
        <Skeleton className="h-6 w-3/4 rounded-lg" />
      </CardHeader>

      <CardBody className="flex flex-col items-center gap-3 p-4">
        <Skeleton className="h-4 w-1/2 rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </CardBody>
    </Card>
  );
};

export default UserCardSkeleton;
