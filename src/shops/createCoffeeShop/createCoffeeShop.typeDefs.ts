const createCoffeeShopTypeDefs = `#graphql

    scalar Upload

    type CreateCoffeeShopResult {
      ok: Boolean!,
      error: String,
      shop: CoffeeShop
    }

  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      category: String
      description: String
      files: [Upload!]!
    ): CreateCoffeeShopResult!
  }
`;

export default createCoffeeShopTypeDefs;
