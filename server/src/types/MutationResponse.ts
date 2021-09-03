import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export abstract class IMutationRepsponse {
    @Field()
    code: number;

    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;
}
