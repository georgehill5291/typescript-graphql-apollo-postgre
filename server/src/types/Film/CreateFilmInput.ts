import { Field, InputType } from "type-graphql";

@InputType()
export class CreateFilmInput {
    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    url: string;

    @Field()
    imageBanner: string;
}
