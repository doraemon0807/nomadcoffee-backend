const seeCoffeeShopsTypeDefs = `#graphql

  type Query {
    seeCoffeeShops(lastId: Int): [CoffeeShop]!
  }
`;

export default seeCoffeeShopsTypeDefs;
