import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateFilmInput {
    @Field((_type) => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    url: string;

    @Field()
    imageBanner: string;
}
