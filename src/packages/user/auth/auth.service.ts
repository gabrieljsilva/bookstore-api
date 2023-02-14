import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/module';
import { CredentialsNotMatchException, NotFoundException } from '@exceptions';
import { Hashing } from '@utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const credentials = await this.prisma.credentials.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (!credentials) {
      throw new NotFoundException('user', { email });
    }

    const passwordMatches = await Hashing.compare(
      password,
      credentials.password,
    );

    if (!passwordMatches) {
      throw new CredentialsNotMatchException();
    }

    return this.jwtService.sign({ credentialsId: credentials.id });
  }
}
