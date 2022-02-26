import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'verification_tokens' })
export class VerificationToken {
  @PrimaryGeneratedColumn('identity')
  identifier: string

  @Column()
  token: string

  @Column('timestamp')
  expires: Date
}
