import { Injectable, UnauthorizedException } from '@nestjs/common'
import { sampleUsers, User } from './utils/user'

type Credential = {
  identity: string
  password: string
}

@Injectable()
export class AuthService {
  async find(identity: string): Promise<User> {
    return await new Promise(async res =>
      res(
        sampleUsers.find(user =>
          identity.includes('@')
            ? user.email === identity
            : user.username === identity
        )
      )
    )
  }

  async validate(credential: Credential): Promise<Record<string, any>> {
    const { password, ...user } = await this.find(credential.identity)

    if (!(user && credential.password === password)) {
      throw new UnauthorizedException({
        message: credential.identity.includes('@')
          ? 'Invalid Email address or Password'
          : 'Invalid Username or Password'
      })
    }

    return user
  }
}
