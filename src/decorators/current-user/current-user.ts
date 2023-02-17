import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@models';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
