import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator'

export function IsPureString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPureString',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} must be a pure string (no digits allowed)`, // 自定义默认错误消息
        ...validationOptions
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          // 确保它是字符串，且不只包含数字
          return typeof value === 'string' && !/^\d+$/.test(value)
        }
      }
    })
  }
}
