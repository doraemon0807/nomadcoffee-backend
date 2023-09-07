import { User } from "@prisma/client";
import { Resolvers } from "../types.js";

const usersResolver: Resolvers = {
  User: {
    totalFollowers: ({ id }: User, _, { client }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowing: ({ id }: User, _, { client }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }: User, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }: User, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }

      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
};

export default usersResolver;
