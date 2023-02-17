import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_PERMISSIONS_METADATA_KEY } from '@constants';
import { UserModel } from '@models';
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
    const user = ctx.user as UserModel;

    const permissions = deepFlat(
      user.credentials.roles.map((role) =>
        role.permissions.map((permission) => permission.name),
      ),
    );

    return requiredPermissions.every((requiredPermission) =>
      permissions.includes(requiredPermission),
    );
  }
}
