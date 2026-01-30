import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RolesDecorator } from './roles/roles.decorator';

@Module({
  providers: [AuthService, JwtStrategy, RolesDecorator]
})
export class AuthModule {}
