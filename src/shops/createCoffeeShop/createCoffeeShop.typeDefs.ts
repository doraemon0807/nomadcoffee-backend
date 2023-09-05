const createCoffeeShopTypeDefs = `#graphql

    scalar Upload

  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      category: String
      files: [Upload!]!
    ): MutationResponse!
  }
`;

export default createCoffeeShopTypeDefs;
