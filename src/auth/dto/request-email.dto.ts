import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestEmailDto {
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
  })
  email: string;
}
