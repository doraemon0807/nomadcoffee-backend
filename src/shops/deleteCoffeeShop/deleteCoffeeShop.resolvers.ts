import { CoffeeShop } from "@prisma/client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { cleanCategories } from "../shops.utils";

const deleteCoffeeShopResolver: Resolvers = {
  Mutation: {
    deleteCoffeeShop: protectedResolver(
      async (_, { id }: CoffeeShop, { client, loggedInUser }) => {
        //Find shop that matches id AND uploaded by the current user
        const foundShop = await client.coffeeShop.findUnique({
          where: {
            id,
          },
          select: {
            id: true,
            userId: true,
          },
        });
        if (!foundShop) {
          return {
            ok: false,
            error: "The shop is not found.",
          };
        }

        //Check if you are the owner of the post
        if (foundShop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        }

        //Update shop && disconnect categories && connect new categories
        await client.coffeeShop.delete({
          where: {
            id,
          },
        });

        //Delete category if there are 0 shops
        await cleanCategories();

        return {
          ok: true,
        };
      }
    ),
  },
};

export default deleteCoffeeShopResolver;
