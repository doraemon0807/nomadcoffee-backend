import { Resolvers } from "../../types";

interface SearchCoffeeShopsProps {
  keyword: string;
  offset: number;
}

const searchCoffeeShopsResolver: Resolvers = {
  Query: {
    searchCoffeeShops: async (
      _,
      { keyword, offset }: SearchCoffeeShopsProps,
      { client }
    ) => {
      if (keyword.length < 3) {
        return [];
      }

      const shops = await client.coffeeShop.findMany({
        where: {
          name: {
            mode: "insensitive",
            contains: keyword,
          },
        },
        include: {
          photos: true,
        },
        take: 18,
        skip: offset,
        // ...(lastId && { cursor: { id: lastId } }),
      });
      return shops;
    },
  },
};

export default searchCoffeeShopsResolver;
