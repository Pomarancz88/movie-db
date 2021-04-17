import { Test, TestingModule } from '@nestjs/testing';
import { OmdbapiController } from './omdbapi.controller';

describe('OmdbapiController', () => {
  let controller: OmdbapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OmdbapiController],
    }).compile();

    controller = module.get<OmdbapiController>(OmdbapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
