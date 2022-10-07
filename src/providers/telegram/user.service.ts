import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import { TelegramUser } from 'src/interface/telegram-user.interface'

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  private cacheKey = 'telegram-user'
  private cacheKeyBackup = 'telegram-user-backup'

  private searchTelegramUsers = (
    telegramUsers: TelegramUser[],
    isFound: boolean,
    user: string
  ): {
    result: string
    isFound: boolean
  } => {
    let result = user
    for (const telegramUser of telegramUsers) {
      if (telegramUser.username === user) {
        result = telegramUser.telegram
        isFound = true
        break
      }
    }
    return {
      result,
      isFound,
    }
  }

  private mapping = (telegramUsers: TelegramUser[], participants: string[]): string[] => {
    const users = []
    for (const participant of participants) {
      const isFound = false
      const telegramUser = this.searchTelegramUsers(telegramUsers, isFound, participant)
      if (!telegramUser.isFound) users.push(participant)
      else users.push(telegramUser.result)
    }
    return users
  }

  private setUsers = async () => {
    try {
      const response = await this.httpService.axiosRef.get(
        this.configService.get('url.telegramUser')
      )
      await this.cache.set(this.cacheKey, JSON.stringify(response.data.rows), {
        ttl: this.configService.get('redis.ttl') * 60000,
      })
      await this.cache.set(this.cacheKeyBackup, JSON.stringify(response.data.rows), { ttl: 0 })
      return true
    } catch (error) {
      await this.cache.set(this.cacheKey, await this.cache.get(this.cacheKeyBackup), { ttl: 1440 })
      return true
    }
  }

  async getUsers(participants: string[]) {
    if (!(await this.cache.get(this.cacheKey))) await this.setUsers()

    const telegramUser: TelegramUser[] = JSON.parse(await this.cache.get(this.cacheKey))

    return this.mapping(telegramUser, participants)
  }
}
