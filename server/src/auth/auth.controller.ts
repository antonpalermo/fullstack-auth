import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.create(user)
  }

  // http://localhost:3000/auth/user?id="some_id"
  @Get('user')
  async user(
    @Query('id') id?: string,
    @Query('email') email?: string
  ): Promise<User> {
    return await this.authService.findOne({ where: [{ id }, { email }] })
  }

  @Get('users')
  async users(): Promise<User[]> {
    return await this.authService.findAll()
  }
}
