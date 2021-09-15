import { Film } from "../../entities/Film";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedFilms {
    @Field()
    totalCount!: number;

    @Field((_type) => [Film])
    paginatedFilms!: Film[];
}
