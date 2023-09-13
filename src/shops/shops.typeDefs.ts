const shopsTypeDefs = `#graphql
  type CoffeeShop {
    id: Int!
    createdAt: String!
    updatedAt: String!
    name: String!
    latitude: String
    longitude: String
    description: String
    user: User
    photos: [CoffeeShopPhoto]!
    categories: [Category]!
    isMine: Boolean!
  }

  type CoffeeShopPhoto {
    id: Int!
    createdAt: String!
    updatedAt: String!
    url: String!
    shop: CoffeeShop!
  }

  type Category {
    id: Int!
    createdAt: String!
    updatedAt: String!
    slug: String!
    name: String!
    shops: [CoffeeShop]
    totalShops: Int!
  }
`;

export default shopsTypeDefs;
