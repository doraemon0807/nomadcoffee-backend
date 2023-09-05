import { Pagination, Resolvers } from "../../types";

const seeCategoriesResolver: Resolvers = {
  Query: {
    seeCategories: async (_, { lastId }: Pagination, { client }) => {
      const offset = 3;
      const categories = await client.category.findMany({
        take: offset,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      });
      return categories;
    },
  },
};

export default seeCategoriesResolver;
