import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({name: "isBrPhone"})
export class IsBrPhoneConstraint implements ValidatorConstraintInterface {
    validate(value: unknown): boolean {
        if (typeof value !== "string") return false

        const phoneRegex = /^\(?\d{2}\)?\s?\d{4}-?d{4}$/
        return phoneRegex.test(value)
    }
    defaultMessage(args?: ValidationArguments): string {
        return `O número "${args?.value}" não é um celular válido (XX) 9XXXX-XXXX`
    }
}