export interface JwtPayload {
  iat: number;
  sub: string;
  credentialsId: string;
}
