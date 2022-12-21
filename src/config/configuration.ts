import { config } from 'dotenv'
import { TelegramClient } from 'telegram'
import { LogLevel } from 'telegram/extensions/Logger'
import { StringSession } from 'telegram/sessions'

config()

// init user telegram
const stringSession = new StringSession(process.env.TELEGRAM_USER_SESSION)
const user = new TelegramClient(
  stringSession,
  Number(parseInt(process.env.TELEGRAM_USER_ID)),
  process.env.TELEGRAM_USER_HASH,
  {}
)

user.setLogLevel(LogLevel.NONE)

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
    statuses: JSON.parse(process.env.CLICKUP_STATUSES),
  },
  telegram: {
    bot: process.env.TELEGRAM_BOT,
    chatID: process.env.TELEGRAM_CHAT_ID,
    user,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    ttl: parseInt(process.env.REDIS_TTL) || 10, // minute
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
    telegramUser: process.env.URL_TELEGRAM_USER,
    imageExt: 'jpg|png|jpeg',
    clickup: process.env.URL_CLICKUP,
  },
})
