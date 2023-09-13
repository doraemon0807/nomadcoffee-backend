import { CoffeeShop } from "@prisma/client";
import { Resolvers } from "../types.js";

const ShopsResolver: Resolvers = {
  CoffeeShop: {
    isMine: ({ userId }: CoffeeShop, _, { loggedInUser }) => {
      return userId === loggedInUser.id;
    },
  },

  Category: {
    totalShops: ({ id }: CoffeeShop, _, { client }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default ShopsResolver;
