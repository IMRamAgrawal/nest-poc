import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'ram.agarwal@ongraph.com' })
  @IsEmail()
  email: string;
}
