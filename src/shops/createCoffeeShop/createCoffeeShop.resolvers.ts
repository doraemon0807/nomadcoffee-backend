import { CoffeeShop } from "@prisma/client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories, processUrls } from "../shops.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { uploadToS3 } from "../../shared/shared.utils";

interface CreateCoffeeShopProps extends CoffeeShop {
  category: string;
  files: any;
}

const createCoffeeShopResolver = {
  Upload: GraphQLUpload,

  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, category, files }: CreateCoffeeShopProps,
        { client, loggedInUser }
      ) => {
        let categoryObj = [];
        //parse category
        if (category) {
          //connect or create category
          categoryObj = processCategories(category);
        }

        //upload multiple photos
        let fileUrl = [];

        await Promise.all(
          files.map(async (file: any) => {
            const urlLocation = await uploadToS3(
              file,
              loggedInUser.id,
              "uploads"
            );
            fileUrl.push(urlLocation);
          })
        );

        const urlObj = processUrls(fileUrl);

        //create shop
        await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },

            //create photo
            photos: {
              create: urlObj,
            },

            //if category exists, then connect or create categories
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default createCoffeeShopResolver;
