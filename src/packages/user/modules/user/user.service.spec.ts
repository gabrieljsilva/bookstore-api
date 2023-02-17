import { UserService } from './user.service';
import { PrismaService } from '@prisma/module';
import { Test } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CreateUserDto } from './dtos';
import { ObjectId } from 'bson';
import { credentialsFactory, userFactory } from '@testing';
import { AlreadyExistsException } from '@exceptions';

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

  it('Should create a customer user if email is not in use', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '1234@abc',
    };

    const mockedUser = userFactory.build({
      name: createUserDto.name,
      credentials: credentialsFactory.build({
        email: createUserDto.email,
      }),
    });

    prisma.credentials.findFirst.mockResolvedValueOnce(null);
    prisma.user.create.mockResolvedValueOnce(mockedUser);

    const user = await userService.createUser(createUserDto);

    expect(ObjectId.isValid(user.id)).toBe(true);
    expect(user.name).toBe(createUserDto.name);
    expect(user.credentials.email).toBe(createUserDto.email.toLowerCase());
  });

  it('should throw and error if email already in user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '1234@abc',
    };

    const mockedUser = userFactory.build({
      name: createUserDto.name,
      credentials: credentialsFactory.build({
        email: createUserDto.email,
      }),
    });

    const mockedCredentials = credentialsFactory.build({
      email: createUserDto.email,
      user: userFactory.build({ name: createUserDto.name }),
    });

    prisma.credentials.findFirst.mockResolvedValueOnce(mockedCredentials);
    prisma.user.create.mockResolvedValueOnce(mockedUser);

    await expect(() =>
      userService.createUser(createUserDto),
    ).rejects.toThrowError(AlreadyExistsException);
  });
});
