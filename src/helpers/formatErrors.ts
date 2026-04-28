import { ValidationError } from "class-validator"
import { IValidationError } from "../types/IvalidationError"

export const formatErrors = (errors: ValidationError[]) => {
    const formattedErrors: IValidationError[] = errors.map((error) => ({
        field: error.property, messages: Object.values(error.constraints ?? {})
    }))
    return formattedErrors    
}