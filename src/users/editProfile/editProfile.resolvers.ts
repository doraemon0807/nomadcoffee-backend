import { User } from "@prisma/client";
import { Resolvers } from "../../types.js";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils.js";

interface UserWithPasswords extends User {
  oldPassword?: string;
  newPassword?: string;
}

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
          oldPassword,
          newPassword,
          avatarURL,
          githubUsername,
        }: UserWithPasswords,
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
        let newHashPassword = null;

        if (oldPassword && newPassword) {
          newHashPassword = await bcrypt.hash(newPassword, 10);
        }

        console.log(oldPassword);
        console.log(foundUser.password);

        const passwordCheck = await bcrypt.compare(
          oldPassword,
          foundUser.password
        );

        if (!passwordCheck) {
          return {
            ok: false,
            error: "Incorrect password.",
          };
        }

        const updateUser = await client.user.update({
          where: {
            username,
          },
          data: {
            username,
            email,
            name,
            location,
            githubUsername,
            ...(avatar && { avatarURL: avatar }),
            ...(newHashPassword && { password: newHashPassword }),
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
