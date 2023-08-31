import "dotenv/config";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";

interface OnConnectProps {
  req: {
    headers: {
      token: string;
    };
  };
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: async ({
    req: {
      headers: { token },
    },
  }: OnConnectProps) => {
    if (token) {
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
        client,
      };
    }
  },
});

const PORT = process.env.PORT;

server
  .listen()
  .then(() => console.log(`Server is running on http://localhost:${PORT}`));
