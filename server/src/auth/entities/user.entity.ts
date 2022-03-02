import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Account, transformer } from './account.entity'
import { Session } from './session.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', nullable: true })
  name!: string | null

  @Column({ type: 'varchar', nullable: true, unique: true })
  email!: string | null

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  emailVerified!: string | null

  @Column({ type: 'varchar', nullable: true })
  image!: string | null

  @OneToMany(() => Session, session => session.userId)
  sessions!: Session[]

  @OneToMany(() => Account, account => account.userId)
  accounts!: Account[]
}
