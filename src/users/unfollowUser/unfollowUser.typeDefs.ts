import { gql } from "apollo-server";

const UnfollowUserTypeDefs = gql`
  type UnfollowUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(username: String!): UnfollowUserResult!
  }
`;

export default UnfollowUserTypeDefs;
