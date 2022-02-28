import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn('identity')
  id: string

  @Column('timestamp')
  expires: Date

  @Column()
  sessionToken: string

  @ManyToOne(() => User, user => user.sessions)
  user!: User
}
