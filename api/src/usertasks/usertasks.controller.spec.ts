import { Test, TestingModule } from '@nestjs/testing';
import { UsertasksController } from './usertasks.controller';

describe('UsertasksController', () => {
  let controller: UsertasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsertasksController],
    }).compile();

    controller = module.get<UsertasksController>(UsertasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
