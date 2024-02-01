// 这是单元测试文件 暂时不用管他
import { Test, TestingModule } from '@nestjs/testing';
import { NtprojectService } from '../services/ntproject.service';

describe('NtprojectService', () => {
  let service: NtprojectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NtprojectService],
    }).compile();

    service = module.get<NtprojectService>(NtprojectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
