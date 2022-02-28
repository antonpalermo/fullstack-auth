import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn('identity')
  id: string

  @Column()
  type: string

  @Column()
  provider: string

  @Column()
  provider_account_id: string

  @Column()
  refresh_token: string

  @Column()
  access_token: string

  @Column('int')
  expires_at: number

  @Column()
  token_type: string

  @Column()
  scope: string

  @Column()
  id_token: string

  @Column()
  session_state: string

  @Column()
  oauth_token_secret: string

  @Column()
  oauth_token: string

  @ManyToOne(() => User, user => user.accounts, {
    createForeignKeyConstraints: true
  })
  user!: User
}
