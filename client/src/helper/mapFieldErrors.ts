import { FieldError } from "generated/graphql";

export const mapFieldErrors = (errors: FieldError[]): { [key: string]: any } => {
    return errors.reduce((accumulatedErrorObj, error) => {
        return {
            ...accumulatedErrorObj,
            [error.field]: error.message,
        };
    }, {});
};
