import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ForbiddenException('Authorization header is missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

    if (decoded.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins are allowed to access this resource');
    }

    return true; // Grant access
  }
}
