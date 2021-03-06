import { Entity, PrimaryGeneratedColumn, Column, Any } from 'typeorm'
import { Length, IsString } from 'class-validator'

@Entity()
export class Demo {
  @PrimaryGeneratedColumn()
  id: number

  @Length(1, 64)
  @Column()
  title: string

  @IsString()
  @Column('text')
  text: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string

  @Column({ type: 'timestamp', nullable: false })
  deleted_at: string
}
