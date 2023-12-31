import { User } from "@prisma/client";
import { Resolvers } from "../../types.js";
import bcrypt from "bcrypt";

const createAccountResolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      {
        username,
        email,
        name,
        location,
        password,
        avatarURL,
        githubUsername,
      }: User,
      { client }
    ) => {
      //Check if user already exists
      const foundUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });

      if (foundUser) {
        return {
          ok: false,
          error: "This username/email is already taken.",
        };
      }

      //Hash password
      const hashPassword = await bcrypt.hash(password, 10);

      //Save user
      await client.user.create({
        data: {
          username,
          email,
          name,
          location,
          password: hashPassword,
          ...(githubUsername && { githubUsername }),
        },
      });

      return {
        ok: true,
      };
    },
  },
};

export default createAccountResolvers;
