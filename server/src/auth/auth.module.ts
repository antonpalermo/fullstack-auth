import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Account } from './entities/account.entity'
import { VerificationToken } from './entities/verification-token.entity'
import { Session } from './entities/session.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Account, VerificationToken, Session])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
