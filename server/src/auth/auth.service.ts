import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { User } from './entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepo.save(user)
  }

  async update(user: UpdateAuthDto): Promise<User> {
    return await this.userRepo.save({ ...user })
  }

  async delete(id: string) {
    await this.userRepo.manager.transaction(async tx => {
      await tx.delete('accounts', { id })
      await tx.delete('sessions', { id })
      await tx.delete('users', { id })
    })
  }

  async findOne(options?: FindOneOptions<User>): Promise<User> {
    return await this.userRepo.findOne(options)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find()
  }
}
