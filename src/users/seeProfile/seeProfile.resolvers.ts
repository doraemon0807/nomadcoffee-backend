import { Resolvers } from "../../types";
import { User } from "@prisma/client";

const seeProfileResolver: Resolvers = {
  Query: {
    seeProfile: (_, { username }: User, { client }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

export default seeProfileResolver;
