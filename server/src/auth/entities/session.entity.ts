import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn('identity')
  id: string

  @Column()
  userId: string

  @Column('timestamp')
  expires: Date

  @Column()
  sessionToken: string
}
