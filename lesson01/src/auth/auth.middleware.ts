// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      const [, access_token] = authorizationHeader.split(' ');
      if (access_token && await this.authService.isTokenRevoked(access_token)) {
        return res.status(401).json({ message: 'Token revoked' });
      }
    }
    next();
  }
}
