import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoogleController } from './google/google.controller';
import { GoogleStrategy } from './auth/google.strategy';
import { OmdbapiService } from './omdbapi/omdbapi.service';
import { OmdbapiController } from './omdbapi/omdbapi.controller';
import { OmdbapiModule } from './omdbapi/omdbapi.module';

@Module({
  imports: [AuthModule, UsersModule, OmdbapiModule],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
