import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import { Rows } from '../../interface/digiteam.interface'

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  private cacheKey = 'digiteam:users'

  private searchRows = (
    rows: Rows[],
    isFound: boolean,
    user: string
  ): {
    result: string
    isFound: boolean
  } => {
    let result = user
    for (const row of rows) {
      if (row.git === user) {
        result = row.telegram
        isFound = true
        break
      }
    }
    return {
      result,
      isFound,
    }
  }

  private mapping = (rows: Rows[], users: string[]): string[] => {
    const result = []
    for (const user of users) {
      const isFound = false
      const rowSearch = this.searchRows(rows, isFound, user)
      if (!rowSearch.isFound) result.push(user)
      else result.push(rowSearch.result)
    }
    return result
  }

  async users(participants: string) {
    const users: string[] = participants.trimEnd().split(/[ ,]+/)

    if (!(await this.cache.get(this.cacheKey))) {
      const response = await this.httpService.axiosRef.get(
        this.configService.get('url.gitUsername')
      )
      if (response.status !== 200) return users
      await this.cache.set(this.cacheKey, JSON.stringify(response.data.rows), { ttl: 0 })
    }

    const rows: Rows[] = JSON.parse(await this.cache.get(this.cacheKey))

    return this.mapping(rows, users)
  }
}
