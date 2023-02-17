import { Test } from '@nestjs/testing';
import { PrismaService } from '@prisma/module';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos';
import { credentialsFactory } from '@testing';
import { Hashing } from '@utils';
import { JwtPayload } from '@models';
import { CredentialsNotMatchException, NotFoundException } from '@exceptions';

describe('auth service tests', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({ secretOrPrivateKey: 'Lorem Ipsum' })],
      providers: [AuthService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep(PrismaService))
      .compile();

    authService = module.get(AuthService);
    jwtService = module.get(JwtService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should be able do make login', async () => {
    const loginDto: LoginDto = {
      email: 'admin@email.com',
      password: '1234@abc',
    };

    const credentialsMock = credentialsFactory.build({
      email: loginDto.email,
      password: await Hashing.hash(loginDto.password),
    });

    prisma.credentials.findFirst.mockResolvedValueOnce(credentialsMock);

    const token = await authService.login(loginDto);
    const payload = jwtService.decode(token) as JwtPayload;

    expect(token).toBeDefined();
    expect(payload.credentialsId).toBe(credentialsMock.id);
  });

  it('should not be able to make login if user not found', async () => {
    const loginDto: LoginDto = {
      email: 'admin@email.com',
      password: '1234@abc',
    };

    prisma.credentials.findFirst.mockResolvedValueOnce(null);

    await expect(authService.login(loginDto)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should not be able to make login if credentials are invalid', async () => {
    const loginDto: LoginDto = {
      email: 'admin@email.com',
      password: '1234@abc',
    };

    const credentialsMock = credentialsFactory.build({
      email: loginDto.email,
      password: await Hashing.hash('Other Password'),
    });

    prisma.credentials.findFirst.mockResolvedValueOnce(credentialsMock);

    await expect(authService.login(loginDto)).rejects.toThrowError(
      CredentialsNotMatchException,
    );
  });
});
