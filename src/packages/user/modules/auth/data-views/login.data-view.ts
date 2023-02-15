export class LoginDataView {
  accessToken: string;
  issuedAt: Date;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.issuedAt = new Date();
  }
}
