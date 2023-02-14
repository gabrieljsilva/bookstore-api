import { EXCEPTION_CODES } from '@enums';

export interface Exception<T = unknown> {
  message: string;
  code: EXCEPTION_CODES;
  payload?: T;
}
