import { Resolvers } from "../../types.js";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginResolver: Resolvers = {
  Mutation: {
    login: async (_, { username, password }: User, { client }) => {
      const foundUser = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!foundUser) {
        return {
          ok: false,
          error: "The username or password is wrong. Please try again.",
        };
      }
      const passwordCheck = await bcrypt.compare(password, foundUser.password);

      if (!passwordCheck) {
        return {
          ok: false,
          error: "The username or password is wrong. Please try again.",
        };
      }

      const token = jwt.sign({ id: foundUser.id }, process.env.PRIVATE_KEY, {
        expiresIn: "7d",
      });
      return {
        ok: true,
        token,
      };
    },
  },
};

export default loginResolver;
