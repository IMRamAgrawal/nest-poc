
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'The email of the user', example: 'user@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  // @ApiPropertyOptional({ description: 'The password of the user (min length 6)', example: 'password123' })
  // @IsString()
  // @MinLength(6)
  // @IsOptional()
  // password?: string;

  @ApiPropertyOptional({ description: 'The name of the user', example: 'John Does' })
  @IsString()
  @IsOptional()
  name?: string;
}
