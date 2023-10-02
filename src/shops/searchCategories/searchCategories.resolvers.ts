import { Resolvers } from "../../types";

interface SearchCategoriesProps {
  keyword: string;
  offset: number;
}

const searchCategoriesResolver: Resolvers = {
  Query: {
    searchCategories: async (
      _,
      { keyword, offset }: SearchCategoriesProps,
      { client }
    ) => {
      if (keyword.length < 3) {
        return [];
      }

      const categories = await client.category.findMany({
        where: {
          name: {
            mode: "insensitive",
            contains: keyword,
          },
        },
        take: 18,
        skip: offset,
        // ...(lastId && { cursor: { id: lastId } }),
      });
      return categories;
    },
  },
};

export default searchCategoriesResolver;
