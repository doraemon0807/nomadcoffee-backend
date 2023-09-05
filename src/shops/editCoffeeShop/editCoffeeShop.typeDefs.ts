const editCoffeeShopTypeDefs = `#graphql

  type Mutation {
    editCoffeeShop(id: Int!, name: String, latitude: String, longitude: String, categories: String): MutationResponse!
  }
`;

export default editCoffeeShopTypeDefs;
