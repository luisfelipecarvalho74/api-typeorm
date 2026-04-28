import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name: "noBlankSpaces", async: false})
export class NoBlankSpaceConstraint implements ValidatorConstraintInterface {
    validate (value: unknown) {
        return typeof value === "string" && value.trim().length > 0
    }
    defaultMessage(args?: ValidationArguments): string {
        return `O campo ${args?.property} não pode conter espaços em branco`
    }
}