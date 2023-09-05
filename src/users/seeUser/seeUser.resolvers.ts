import { Pagination, Resolvers } from "../../types";
import { User } from "@prisma/client";

interface SeeUserProps extends User, Pagination {}

const seeUserResolver: Resolvers = {
  Query: {
    followers: async (_, { username, lastId }: SeeUserProps, { client }) => {
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
      const offset = 5;
      const following = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .following({
          take: offset,
          skip: lastId ? 1 : 0,
          ...(lastId && {
            cursor: {
              id: lastId,
            },
          }),
        });
      return {
        ok: true,
        following,
      };
    },
    following: async (_, { username, lastId }: SeeUserProps, { client }) => {
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
      const offset = 5;
      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          take: offset,
          skip: lastId ? 1 : 0,
          ...(lastId && {
            cursor: {
              id: lastId,
            },
          }),
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};

export default seeUserResolver;
