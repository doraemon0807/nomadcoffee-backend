const seeCategoryTypeDefs = `#graphql

  type Query {
    seeCategory(category: String!, offset: Int): [CoffeeShop]!
  }
`;

export default seeCategoryTypeDefs;
