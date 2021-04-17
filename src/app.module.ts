import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoogleController } from './google/google.controller';
import { GoogleStrategy } from './auth/google.strategy';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
