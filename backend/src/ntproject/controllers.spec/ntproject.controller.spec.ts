import { Test, TestingModule } from '@nestjs/testing';
import { NtprojectController } from '../controllers/ntproject.controller';
import { NtprojectService } from '../services/ntproject.service';

describe('NtprojectController', () => {
  let controller: NtprojectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NtprojectController],
      providers: [NtprojectService],
    }).compile();

    controller = module.get<NtprojectController>(NtprojectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
