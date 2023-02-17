import { UserService } from './user.service';
import { PrismaService } from '@prisma/module';
import { Test } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('User service tests', () => {
  let userService: UserService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep(PrismaService))
      .compile();

    userService = module.get(UserService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
