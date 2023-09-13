import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils.js";

const meResolver: Resolvers = {
  Query: {
    me: protectedResolver(async (_, __, { client, loggedInUser }) => {
      const user = client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }

      return {
        ok: true,
        profile: user,
      };
    }),
  },
};

export default meResolver;
