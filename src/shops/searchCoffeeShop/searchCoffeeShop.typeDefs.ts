const searchCoffeeShopsTypeDefs = `#graphql

    type Query{
        searchCoffeeShops(keyword:String!, offset: Int): [CoffeeShop]!
    }
`;

export default searchCoffeeShopsTypeDefs;
