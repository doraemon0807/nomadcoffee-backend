import { Resolvers } from "../../types";
import { User } from "@prisma/client";

const unfollowUserResolver: Resolvers = {
  Mutation: {
    unfollowUser: async (_, { username }: User, { loggedInUser, client }) => {
      const foundUser = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!foundUser) {
        return {
          ok: false,
          error: "This user does not exist.",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            disconnect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    },
  },
};

export default unfollowUserResolver;
