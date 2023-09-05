const seeCategoriesTypeDefs = `#graphql

  type Query {
    seeCategories(lastId: Int): [Category]!
  }
`;

export default seeCategoriesTypeDefs;
