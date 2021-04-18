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
      host: process.env.DATABASE_HOST || 'mysqldb',
      port: +(process.env.DATABASE_PORT || 3306),
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'nazwabazy',
      entities: [User],
      synchronize: true,
      retryAttempts: 100,
      retryDelay: 5000
    })
  ],
  controllers: [AppController, GoogleController, FacebookController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
