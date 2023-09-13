import { Pagination, Resolvers } from "../../types.js";

const seeCoffeeShopsResolver: Resolvers = {
  Query: {
    seeCoffeeShops: async (_, { lastId }: Pagination, { client }) => {
      const offset = 12;

      const coffeeShops = await client.coffeeShop.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          photos: true,
          user: true,
          categories: true,
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

export default seeCoffeeShopsResolver;
