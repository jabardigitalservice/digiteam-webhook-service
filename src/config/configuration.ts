import { config } from 'dotenv'

config()

export default () => ({
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.APP_PORT) || 3000,
    env: process.env.APP_ENV,
    key: process.env.APP_KEY,
  },
  clickup: {
    teamID: process.env.CLICKUP_TEAM_ID,
    apiKey: process.env.CLICKUP_API_KEY,
  },
  telegram: {
    bot: process.env.TELEGRAM_BOT,
    chatID: process.env.TELEGRAM_CHAT_ID,
    user: {
      id: parseInt(process.env.TELEGRAM_USER_ID),
      hash: process.env.TELEGRAM_USER_HASH,
      session: process.env.TELEGRAM_USER_SESSION,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  elastic: {
    cloudID: process.env.ELASTIC_CLOUD_ID,
    apiKey: process.env.ELASTIC_API_KEY,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  url: {
    screenshot: process.env.URL_SCREENSHOT,
    telegram: process.env.URL_TELEGRAM,
    gitUsername: process.env.URL_GIT_USERNAME,
    imageExt: 'jpg|png|svg|jpeg',
    clickUpUsername: process.env.URL_CLICKUP_USERNAME,
    clickup: process.env.URL_CLICKUP,
  },
})
