import { User } from "../entities/User";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";
import { IMutationRepsponse } from "./MutationResponse";

@ObjectType({ implements: IMutationRepsponse })
export class UserMutationResponse implements IMutationRepsponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({ nullable: true })
    user?: User;

    @Field((_type) => [FieldError], { nullable: true })
    error?: FieldError[];
}
