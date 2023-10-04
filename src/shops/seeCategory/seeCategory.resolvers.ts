import { Pagination, Resolvers } from "../../types.js";
import { categoryToSlug } from "../shops.utils.js";

interface SeeCategoryProps extends Pagination {
  category: string;
}

const seeCategoryResolver: Resolvers = {
  Query: {
    seeCategory: async (
      _,
      { category, offset }: SeeCategoryProps,
      { client }
    ) => {
      const coffeeShops = await client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              slug: categoryToSlug(category),
            },
          },
        },
        include: {
          user: true,
          photos: true,
          categories: true,
        },
        take: 2,
        skip: offset,
      });
      return coffeeShops;
    },
  },
};

export default seeCategoryResolver;
