import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common'
import Joi, { NumberSchema, ObjectSchema, StringSchema } from 'joi'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema | StringSchema | NumberSchema) {}

  transform(values: Record<string, any>, metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(values, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
      cache: true,
      errors: {
        wrap: {
          label: '',
        },
      },
    })

    if (!error) return value

    const errors = this.validateError(error.details, metadata)

    throw new UnprocessableEntityException(errors)
  }

  private validateError = (details: Joi.ValidationErrorItem[], metadata: ArgumentMetadata) => {
    const rules: any = {}

    for (const item of details) {
      const { path } = item

      if (path.length === 0) path.push(metadata.data)

      const key = path.join('.')

      rules[key] = item.message
    }

    return rules
  }
}
