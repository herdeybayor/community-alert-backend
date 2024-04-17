import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { IsUnique } from '../../is-unique/is-unique';
import { UserRole } from '../entities/user.entity';

const passwordRegEx = {
  specialChar: /(?=.*[@$!%*?&])/,
  number: /(?=.*\d)/,
  lowercase: /(?=.*[a-z])/,
  uppercase: /(?=.*[A-Z])/,
  minLength: /(?=.{8,})/,
};

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  @IsString()
  @MinLength(3, { message: 'First name is too short' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  @IsString()
  @MinLength(3, { message: 'Last name is too short' })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  @Validate(IsUnique, ['User', 'email'], {
    message: 'Email already exists',
  })
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegEx.specialChar, {
    message: 'Password must contain at least one special character',
  })
  @Matches(passwordRegEx.number, {
    message: 'Password must contain at least one number',
  })
  @Matches(passwordRegEx.lowercase, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(passwordRegEx.uppercase, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(passwordRegEx.minLength, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;

  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user',
  })
  @IsEnum(UserRole, { message: 'Role must be either admin or user' })
  @IsOptional()
  role: UserRole;

  @ApiProperty({
    example: '08012345678',
    description: 'The phone number of the user',
  })
  @IsPhoneNumber('NG', { message: 'Invalid phone number' })
  tel: string;
}
