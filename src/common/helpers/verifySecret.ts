import { UnauthorizedException } from '@nestjs/common'

export const verifySecretKey = (secret: string, key: string) => {
  if (secret !== key) throw new UnauthorizedException()
}
