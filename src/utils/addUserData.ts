import { Rating } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";

export const addUserData = async (ratings: Rating[]) => {
  const userId = ratings.map((rating) => rating.userId);
  const users = await clerkClient.users.getUserList({ userId: userId });
  return ratings.map((rating) => {
    const user = users.find((user) => user.id === rating.userId);
    return {
      ...rating,
      userId: user?.firstName ?? "",
      userSecretId: rating.userId,
    };
  });
};
