const seeCoffeeShopsTypeDefs = `#graphql

  type Query {
    seeCoffeeShops(offset: Int): [CoffeeShop]!
  }
`;

export default seeCoffeeShopsTypeDefs;
