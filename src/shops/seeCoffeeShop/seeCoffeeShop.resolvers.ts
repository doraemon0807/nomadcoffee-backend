import { CoffeeShop } from "@prisma/client";
import { Resolvers } from "../../types";

const seeCoffeeShopResolver: Resolvers = {
  Query: {
    seeCoffeeShop: async (_, { id }: CoffeeShop, { client }) => {
      const coffeeShop = await client.coffeeShop.findUnique({
        where: {
          id,
        },
        include: {
          categories: {
            select: {
              name: true,
            },
          },
          photos: {
            select: {
              url: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
      });
      return coffeeShop;
    },
  },
};

export default seeCoffeeShopResolver;
