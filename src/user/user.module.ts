
// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule here
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export if needed in other modules
})
export class UserModule {}
