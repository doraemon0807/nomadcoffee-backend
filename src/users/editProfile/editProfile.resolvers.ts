import { User } from "@prisma/client";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const editProfileResolver: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
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
        { loggedInUser, client }
      ) => {
        const foundUser = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });

        if (!foundUser) {
          return {
            ok: false,
            error: "User does not exist.",
          };
        }

        let avatar = loggedInUser.avatarURL || null;

        let hashPassword = null;

        if (password) {
          hashPassword = await bcrypt.hash(password, 10);
        }

        const updateUser = await client.user.update({
          where: {
            username,
          },
          data: {
            email,
            name,
            location,
            githubUsername,
            ...(avatar && { avatarURL: avatar }),
            ...(hashPassword && { password: hashPassword }),
          },
        });

        if (!updateUser.id) {
          return {
            ok: false,
            error: "Failed to update user profile.",
          };
        } else {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default editProfileResolver;
