import { _002_Permissions } from '.';

export class _004_Customer_permissions extends _002_Permissions {
  get data() {
    return {
      roleName: 'CUSTOMER',
      permissions: ['READ_RENTS', 'READ_RENT', 'READ_BOOKS', 'READ_BOOK'],
    };
  }
}
