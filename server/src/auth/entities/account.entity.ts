import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn('identity')
  id: string

  @Generated('uuid')
  userId: string

  @Column()
  type: string

  @Column()
  provider: string

  @Column()
  providerAccountId: string

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
}
