import { Ctx, Query, Resolver } from "type-graphql";
import { CustomContext } from "../types/CustomContext";

@Resolver()
export class HelloResolver {
    @Query((_return) => String)
    hello(@Ctx() { req }: CustomContext) {
        console.log(req.session.userId);
        return "hello world";
    }
}
