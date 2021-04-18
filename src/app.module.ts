import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoogleController } from './google/google.controller';
import { GoogleStrategy } from './auth/google.strategy';
import { OmdbapiModule } from './omdbapi/omdbapi.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { FacebookController } from './facebook/facebook.controller';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    OmdbapiModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test1',
      entities: [User],
      synchronize: true,
    })
  ],
  controllers: [AppController, GoogleController, FacebookController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
