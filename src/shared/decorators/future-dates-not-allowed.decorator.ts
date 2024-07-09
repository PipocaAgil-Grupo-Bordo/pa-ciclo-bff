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
                    const currentDate = new Date();
                    const inputDate = new Date(value);

                    if (isNaN(inputDate.getTime())) {
                        return false;
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
