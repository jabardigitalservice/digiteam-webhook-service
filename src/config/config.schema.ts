import Joi from 'joi'

export const schema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_ENV: Joi.string().valid('production', 'development').default('development'),
  APP_PORT: Joi.number().default(3000),
  APP_KEY: Joi.string().required(),

  CLICKUP_TEAM_ID: Joi.number().required(),
  CLICKUP_API_KEY: Joi.string().required(),
  CLICKUP_STATUSES: Joi.string().required(),

  TELEGRAM_BOT: Joi.string().required(),
  TELEGRAM_CHAT_ID: Joi.number().required(),
  TELEGRAM_USER_ID: Joi.number().required(),
  TELEGRAM_USER_HASH: Joi.string().required(),
  TELEGRAM_USER_SESSION: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  ELASTIC_CLOUD_ID: Joi.string().required(),
  ELASTIC_API_KEY: Joi.string().required(),

  SENTRY_DSN: Joi.string().required(),

  URL_SCREENSHOT: Joi.string().required(),
  URL_TELEGRAM_USER: Joi.string().required(),
  URL_TELEGRAM: Joi.string().required(),
  URL_CLICKUP: Joi.string().required(),
})
