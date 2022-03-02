import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { transformer } from './account.entity'
import { User } from './user.entity'

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  sessionToken!: string

  @Column({ type: 'uuid' })
  userId!: string

  @Column({ transformer: transformer.date })
  expires!: string

  @ManyToOne(() => User, user => user.sessions)
  user!: User
}
