import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_QUERY_METADATA_KEY } from '@constants';

export const IsPublic = () => SetMetadata(IS_PUBLIC_QUERY_METADATA_KEY, true);
