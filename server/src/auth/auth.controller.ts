import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthService } from './auth.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { CreateSessionDto } from './dto/create-session.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateSessionDto } from './dto/update-session.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Account } from './entities/account.entity'
import { Session } from './entities/session.entity'
import { User } from './entities/user.entity'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>
  ) {}

  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.create(user)
  }

  @Post('link')
  async linktAccount(@Body() account: CreateAccountDto) {
    return await this.accountRepo.save(account)
  }

  @Post('session')
  async createSession(@Body() session: CreateSessionDto) {
    return await this.sessionRepo.save(session)
  }

  @Patch('update')
  async updateUser(@Body() user: UpdateUserDto): Promise<User> {
    return await this.authService.update({ user })
  }

  @Patch('session')
  async updateSession(@Body() session: UpdateSessionDto): Promise<Session> {
    return await this.sessionRepo.save(session)
  }

  @Delete('delete')
  async deleteUser(@Query('id') id: string) {
    return await this.authService.delete(id)
  }

  @Delete('link')
  async unlinkAccount(@Query() id: string) {
    return await this.accountRepo.delete(id)
  }

  @Delete('session')
  async deleteSession(@Query() sessionToken: string) {
    return await this.sessionRepo.delete(sessionToken)
  }

  // http://localhost:3000/auth/user?id="some_id"
  @Get('user')
  async user(
    @Query('id') id?: string,
    @Query('email') email?: string
  ): Promise<User> {
    return await this.authService.findOne({ where: [{ id }, { email }] })
  }

  @Get('account')
  async account(@Query('provider_id') provider_id?: string): Promise<Account> {
    const userAccount = await this.accountRepo.findOne({
      where: { provider_account_id: provider_id },
      relations: ['users']
    })

    if (!userAccount) throw new NotAcceptableException()
    return userAccount ?? null
  }

  @Get('user_session')
  async getUserSession(@Query() sessionToken: string) {
    return await this.sessionRepo.findOne({
      where: { sessionToken },
      relations: ['users']
    })
  }

  @Get('users')
  async users(): Promise<User[]> {
    return await this.authService.findAll()
  }
}
