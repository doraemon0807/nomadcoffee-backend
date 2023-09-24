import { Pagination, Resolvers } from "../../types.js";

const seeCoffeeShopsResolver: Resolvers = {
  Query: {
    seeCoffeeShops: async (_, { offset }: Pagination, { client }) => {
      const coffeeShops = await client.coffeeShop.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          photos: true,
          user: true,
          categories: true,
        },
        take: 2,
        skip: offset,
      });
      return coffeeShops;
    },
  },
};

export default seeCoffeeShopsResolver;
