import { gql } from "apollo-server";

const usersTypeDefs = gql`
  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    username: String!
    email: String!
    name: String!
    location: String!
    password: String!
    avatarURL: String
    githubUsername: String
  }
`;

export default usersTypeDefs;
