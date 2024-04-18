import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { IncidentCategory } from '../entities/incident.entity';

export class CreateIncidentDto {
  @ApiProperty({
    example: 'Car Accident on Main Street',
    description: 'The title of the incident',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'A two-car collision at the intersection.',
    description: 'The description of the incident',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: IncidentCategory,
    description: 'The category of the incident',
  })
  @IsEnum(IncidentCategory)
  category: IncidentCategory;

  @ApiProperty({
    required: false,
    description:
      'Latitude and longitude of the incident location (example: "-12.3456, 34.5678")',
  })
  @IsOptional()
  location: string; // String for easier input, convert to Point in service

  @ApiProperty({
    example: 'https://example.com/accident.jpg',
    description: 'The image URL of the incident',
    required: false, // Make image optional
  })
  @IsOptional()
  @IsString()
  image_url: string;
}
