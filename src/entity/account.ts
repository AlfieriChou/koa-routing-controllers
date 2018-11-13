import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsString, Length } from 'class-validator'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Length(2, 32)
  @Column()
  username: string

  @IsString()
  @Column()
  password: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string

  @Column({ type: 'timestamp', nullable: false })
  deleted_at: string
}
