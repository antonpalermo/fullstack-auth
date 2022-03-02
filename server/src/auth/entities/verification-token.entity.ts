import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { transformer } from './account.entity'

@Entity({ name: 'verification_tokens' })
export class VerificationToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  token!: string

  @Column()
  identifier!: string

  @Column({ transformer: transformer.date })
  expires!: string
}
