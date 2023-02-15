import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { ObjectId } from 'bson';

@ValidatorConstraint({ name: 'isObjectId', async: false })
class IsValidObjectId implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'string') {
      return false;
    }
    return ObjectId.isValid(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid ObjectId`;
  }
}

export function IsObjectId(): PropertyDecorator {
  return Validate(IsValidObjectId);
}
