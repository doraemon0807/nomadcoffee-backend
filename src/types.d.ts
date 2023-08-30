import { GraphQLResolveInfo } from "graphql";

export type Resolver = (
  root: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
