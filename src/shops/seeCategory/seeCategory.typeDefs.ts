const seeCategoryTypeDefs = `#graphql

  type Query {
    seeCategory(category: String!, lastId: Int): [CoffeeShop]!
  }
`;

export default seeCategoryTypeDefs;
