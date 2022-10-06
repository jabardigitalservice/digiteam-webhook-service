import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import { GitUser } from '../../interface/git.interface'

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  private cacheKey = 'git:users'

  private searchGitUsers = (
    gitUsers: GitUser[],
    isFound: boolean,
    user: string
  ): {
    result: string
    isFound: boolean
  } => {
    let result = user
    for (const gitUser of gitUsers) {
      if (gitUser.git === user) {
        result = gitUser.telegram
        isFound = true
        break
      }
    }
    return {
      result,
      isFound,
    }
  }

  private mapping = (gitUsers: GitUser[], participants: string[]): string[] => {
    const users = []
    for (const user of participants) {
      const isFound = false
      const gitUser = this.searchGitUsers(gitUsers, isFound, user)
      if (!gitUser.isFound) users.push(user)
      else users.push(gitUser.result)
    }
    return users
  }

  private setUsers = async () => {
    try {
      const response = await this.httpService.axiosRef.get(
        this.configService.get('url.gitUsername')
      )
      if (response.status !== 200) return false
      await this.cache.set(this.cacheKey, JSON.stringify(response.data.rows), { ttl: 0 })
      return true
    } catch (error) {
      return false
    }
  }

  async getUsers(participants: string[]) {
    if (!(await this.cache.get(this.cacheKey))) {
      const isSuccess = await this.setUsers()
      if (!isSuccess) return participants
    }

    const gitUsers: GitUser[] = JSON.parse(await this.cache.get(this.cacheKey))

    return this.mapping(gitUsers, participants)
  }
}
