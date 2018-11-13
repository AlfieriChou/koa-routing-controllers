import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string

  @Column({ type: 'timestamp', nullable: false })
  deleted_at: string
}
