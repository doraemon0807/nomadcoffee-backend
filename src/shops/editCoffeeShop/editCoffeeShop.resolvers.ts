import { CoffeeShop } from "@prisma/client";
import { Resolvers } from "../../types.js";
import { protectedResolver } from "../../users/users.utils.js";
import { cleanCategories, processCategories } from "../shops.utils.js";

interface EditCoffeeShop extends CoffeeShop {
  categories: string;
}

const editCoffeeShopResolver: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories }: EditCoffeeShop,
        { client, loggedInUser }
      ) => {
        //Find shop that matches id AND uploaded by the current user
        const foundShop = await client.coffeeShop.findUnique({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        });
        if (!foundShop) {
          return {
            ok: false,
            error: "The shop is not found.",
          };
        }

        //Update shop && disconnect categories && connect new categories
        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            categories: {
              disconnect: foundShop.categories,
              connectOrCreate: processCategories(categories),
            },
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

export default editCoffeeShopResolver;
