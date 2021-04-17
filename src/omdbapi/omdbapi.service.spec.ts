import { Test, TestingModule } from '@nestjs/testing';
import { OmdbapiService } from './omdbapi.service';

describe('OmdbapiService', () => {
  let service: OmdbapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmdbapiService],
    }).compile();

    service = module.get<OmdbapiService>(OmdbapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
