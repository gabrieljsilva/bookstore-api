import { applyDecorators, SetMetadata } from '@nestjs/common';
import { REQUIRED_PERMISSIONS_METADATA_KEY } from '@constants';

export function RequirePermissions(...permissions: string[]) {
  return applyDecorators(
    SetMetadata(REQUIRED_PERMISSIONS_METADATA_KEY, permissions),
  );
}
