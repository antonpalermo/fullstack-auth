import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from './account.entity'
import { Session } from './session.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column('timestamp', { nullable: true })
  emailVerified: Date

  @Column({ nullable: true })
  image: string

  @OneToMany(() => Session, session => session.user)
  sessions!: Account[]

  @OneToMany(() => Account, account => account.user)
  accounts!: Account[]
}
