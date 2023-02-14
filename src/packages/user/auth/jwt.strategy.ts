import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../typings';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return this.prisma.user.findFirst({
      where: {
        credentials: {
          id: payload.credentialsId,
        },
      },
      include: {
        credentials: true,
      },
    });
  }
}
