import { ApiProperty } from '@nestjs/swagger';
import { Incident } from '../../incidents/entities/incident.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
  })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  first_name: string;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  last_name: string;

  @Column({ length: 100, unique: true })
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'Password@123',
    description: 'The password of the user',
  })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The image of the user',
  })
  image: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ example: '2023-12-18T10:25:12.000Z' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ example: '2023-12-18T10:25:12.000Z' })
  updated_at: Date;

  @OneToMany(() => Incident, (incident) => incident.user)
  incidents: Incident[];
}
