import * as bcrypt from 'bcrypt';

export class Hashing {
  static async hash(str: string): Promise<string> {
    return bcrypt.hash(str, await bcrypt.genSalt(8));
  }

  static hashSync(str: string) {
    return bcrypt.hashSync(str, bcrypt.genSaltSync(8));
  }

  static async compare(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash);
  }
}
