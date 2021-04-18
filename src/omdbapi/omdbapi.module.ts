import { HttpModule, Module } from '@nestjs/common';
import { OmdbapiController } from './omdbapi.controller';
import { OmdbapiService } from './omdbapi.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://www.omdbapi.com/',
      timeout: 10000,
    }),
    UsersModule
  ],
  exports: [HttpModule],
  controllers: [OmdbapiController],
  providers: [OmdbapiService],
})
export class OmdbapiModule {}
