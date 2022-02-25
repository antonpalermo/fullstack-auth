import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validate')
  async validateCredentials(@Body() { identity, password }: any): Promise<any> {
    return await this.authService.validate({ identity, password })
  }
}
