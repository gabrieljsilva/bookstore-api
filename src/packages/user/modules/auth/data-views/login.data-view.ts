import { ApiProperty } from '@nestjs/swagger';

export class LoginDataView {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  issuedAt: Date;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.issuedAt = new Date();
  }
}
