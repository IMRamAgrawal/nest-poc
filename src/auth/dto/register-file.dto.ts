import { ApiProperty } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';
import { IsOptional } from 'class-validator';

export class RegisterWithFileDto extends RegisterDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Profile image file',
    required: false,
  })
  @IsOptional()
  profileImage?: any;
}
