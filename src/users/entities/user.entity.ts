import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

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
}
