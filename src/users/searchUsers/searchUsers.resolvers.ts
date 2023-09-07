import { Pagination, Resolvers } from "../../types.js";

interface SearchUsersProps extends Pagination {
  keyword: string;
}

const searchUsersResolver: Resolvers = {
  Query: {
    searchUsers: async (
      _,
      { keyword, lastId }: SearchUsersProps,
      { client }
    ) => {
      const offset = 5;

      const users = await client.user.findMany({
        where: {
          username: {
            mode: "insensitive",
            contains: keyword,
          },
        },
        take: offset,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      });
      return users;
    },
  },
};

export default searchUsersResolver;
