const searchCategoriesTypeDefs = `#graphql

    type Query{
        searchCategories(keyword:String!, offset: Int): [Category]!
    }
`;

export default searchCategoriesTypeDefs;
