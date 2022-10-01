import Joi from 'joi'

export const schema = Joi.object({
  app: Joi.object({
    name: Joi.string().required(),
    port: Joi.number().default(3000),
    env: Joi.string().valid('development', 'production').default('development'),
    key: Joi.string().required(),
  }),
  telegram: Joi.object({
    bot: Joi.string().required(),
    chatID: Joi.number().required(),
    user: Joi.object({
      id: Joi.number().required(),
      hash: Joi.string().required(),
      session: Joi.string().required(),
    }),
  }),
  redis: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
  }),
  elastic: Joi.object({
    cloudID: Joi.string().required(),
    apiKey: Joi.string().required(),
  }),
  sentry: Joi.object({
    dsn: Joi.string().required(),
  }),
  url: {
    excel: Joi.string().required(),
    screeshot: Joi.string().required(),
    gitUsername: Joi.string().required(),
  },
})
