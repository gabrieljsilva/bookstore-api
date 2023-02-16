import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_PERMISSIONS_METADATA_KEY } from '@constants';
import { DatabaseCredentials } from '../../../../typings/prisma';
import { deepFlat } from '@utils';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      REQUIRED_PERMISSIONS_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const ctx = context.switchToHttp().getRequest();
    const credentials = ctx.user as DatabaseCredentials;

    const permissions = deepFlat(
      credentials.roles.map((role) =>
        role.permissions.map((permission) => permission.name),
      ),
    );

    return requiredPermissions.every((requiredPermission) =>
      permissions.includes(requiredPermission),
    );
  }
}
