import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'newPassword1234' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: '96c5651f65207fe68d2593b287173e50ce0faec3e1df581984a35e89a880b002',
  })
  @IsString()
  token: string;
}
