import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@project/blog-user';
import { getJwtOptions } from '@project/config';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { NotifyModule } from '@project/user-notify';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule,
    RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy, LocalStrategy, JwtRefreshStrategy]
})
export class AuthenticationModule {}
