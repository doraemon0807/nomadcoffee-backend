import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = jwt.verify(token, process.env.PRIVATE_KEY) as JwtPayload;

    const loggedInUser = await client.user.findUnique({
      where: {
        id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver): Resolver =>
  (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
