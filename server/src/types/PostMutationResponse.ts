import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";
import { IMutationRepsponse } from "./MutationResponse";
import { Post } from "../entities/Post";

@ObjectType({ implements: IMutationRepsponse })
export class PostMutationResponse implements IMutationRepsponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({ nullable: true })
    post?: Post;

    @Field((_type) => [FieldError], { nullable: true })
    error?: FieldError[];
}
