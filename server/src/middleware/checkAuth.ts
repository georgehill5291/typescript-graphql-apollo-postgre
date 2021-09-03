import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import { CustomContext } from "../types/CustomContext";

export const CheckAuth: MiddlewareFn<CustomContext> = async ({ context: { req } }, next) => {
    if (!req.session.userId) {
        throw new AuthenticationError("Not authentication yet");
    }
    return next();
};
