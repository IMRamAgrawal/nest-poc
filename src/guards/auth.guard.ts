import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Authorization header is missing or invalid');
      }
  
      const token = authHeader.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        request.user = decoded; // Attach decoded user information to the request
        return true; // Grant access
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  