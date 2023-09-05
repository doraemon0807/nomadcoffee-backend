import client from "../client";

export const categoryToSlug = (category: string) =>
  category.toLowerCase().replace(/ /g, "-");

export const processCategories = (categoryList: string) => {
  const categories = categoryList.split(",").map((category) => category.trim());
  const names = categories.filter(
    (item, index) => categories.indexOf(item) === index
  );
  return (
    names?.map((name: string) => ({
      where: {
        slug: categoryToSlug(name),
      },
      create: {
        slug: categoryToSlug(name),
        name,
      },
    })) || []
  );
};

export const processUrls = (urlList: Array<string>) => {
  return (
    urlList.map((url) => ({
      url,
    })) || []
  );
};

export const cleanCategories = async () => {
  await client.category.deleteMany({
    where: {
      shops: {
        none: {},
      },
    },
  });
};
