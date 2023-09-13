import { CoffeeShop } from "@prisma/client";
import { Resolvers } from "../../types.js";

const seeCoffeeShopResolver: Resolvers = {
  Query: {
    seeCoffeeShop: async (_, { id }: CoffeeShop, { client }) => {
      const coffeeShop = await client.coffeeShop.findUnique({
        where: {
          id,
        },
        include: {
          categories: true,
          photos: true,
          user: true,
        },
      });
      return coffeeShop;
    },
  },
};

export default seeCoffeeShopResolver;
