import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'lettersOnly', async: false })
export class LettersOnlyConstraint implements ValidatorConstraintInterface {
    validate(name: string) {
        const regex =
            /^(?=(?:.*[a-zA-ZçÇáÁàÀéÉèÈíÍúÚôÔâÂãÃõÕ]){2})[a-zA-ZçÇáÁàÀéÉíÍúÚôÔâÂãÃõÕ\s]+$/;
        return regex.test(name);
    }

    defaultMessage() {
        return 'Name must contain only letters';
    }
}

export function LettersOnly(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: LettersOnlyConstraint,
        });
    };
}
