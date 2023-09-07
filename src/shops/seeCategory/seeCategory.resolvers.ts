import { Pagination, Resolvers } from "../../types.js";
import { categoryToSlug } from "../shops.utils.js";

interface SeeCategoryProps extends Pagination {
  category: string;
}

const seeCategoryResolver: Resolvers = {
  Query: {
    seeCategory: async (
      _,
      { category, lastId }: SeeCategoryProps,
      { client }
    ) => {
      const offset = 5;
      const coffeeShops = await client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              slug: categoryToSlug(category),
            },
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
      return coffeeShops;
    },
  },
};

export default seeCategoryResolver;
