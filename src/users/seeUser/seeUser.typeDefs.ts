import { gql } from "apollo-server";

const seeUserTypeDefs = gql`
  type FollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type FollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    totalPages: Int
  }

  type Query {
    followers(username: String!, lastId: Int): FollowersResult!
    following(username: String!, lastId: Int): FollowingResult!
  }
`;

export default seeUserTypeDefs;
