import { Field, ObjectType } from "type-graphql";
import { IMutationRepsponse } from "../MutationResponse";
import { Film } from "../../entities/Film";
import { FieldError } from "../FieldError";

@ObjectType({ implements: IMutationRepsponse })
export class FilmMutationResponse implements IMutationRepsponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({ nullable: true })
    film?: Film;

    @Field((_type) => [FieldError], { nullable: true })
    error?: FieldError[];
}
