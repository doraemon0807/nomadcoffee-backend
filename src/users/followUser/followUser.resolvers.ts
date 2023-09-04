import { Resolvers } from "../../types";
import { User } from "@prisma/client";

const followUserResolver: Resolvers = {
  Mutation: {
    followUser: async (_, { username }: User, { loggedInUser, client }) => {
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
            connect: {
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

export default followUserResolver;
