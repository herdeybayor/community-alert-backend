import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Point,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum IncidentCategory {
  ACCIDENT = 'Accident',
  FIGHTING = 'Fighting',
  RIOTING = 'Rioting',
  OTHER = 'Other',
}

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The ID of the incident',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Car Accident on Main Street',
    description: 'The title of the incident',
  })
  title: string;

  @Column()
  @ApiProperty({
    example: 'A two-car collision at the intersection.',
    description: 'The description of the incident',
  })
  description: string;

  @Column()
  @ApiProperty({
    example: 'Accident',
    description: 'The category of the incident',
  })
  category: IncidentCategory;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  @ApiProperty({ description: 'The location of the incident' })
  location: Point;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'https://example.com/accident.jpg',
    description: 'The image URL of the incident',
  })
  image_url: string;

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

  @ManyToOne(() => User, (user) => user.incidents)
  user: User;
}
