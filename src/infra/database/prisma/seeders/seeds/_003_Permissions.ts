import { _002_Permissions } from './_002_Permissions';

export class _003_CustomerPermissions extends _002_Permissions {
  get data() {
    return {
      roleName: 'CUSTOMER',
      permissions: [
        'READ_BOOKS',
        'READ_BOOK',
        'RENT_BOOK',
        'READ_OWN_RENTS',
        'READ_OWN_RENT',
      ],
    };
  }
}
