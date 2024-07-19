import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isNotFutureDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
                    const currentDate = new Date();
                    const inputDate = new Date(value);

                    if (!value || typeof value !== 'string' || !iso8601Regex.test(value)) {
                        return true;
                    }

                    return inputDate <= currentDate;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} should not be a future date`;
                },
            },
        });
    };
}
