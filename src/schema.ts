import { loadFiles } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadedTypes = await loadFiles(path.join(__dirname, "**/*.typeDefs.*"), {
  requireMethod: async (path: string) => {
    return await import(pathToFileURL(path).toString());
  },
});

const loadedResolvers = await loadFiles(
  path.join(__dirname, "**/*.resolvers.*"),
  {
    requireMethod: async (path: string) => {
      return await import(pathToFileURL(path).toString());
    },
  }
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers: any = mergeResolvers(loadedResolvers);
