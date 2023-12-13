import { Credentials } from '@models/Credentials';

export interface AuthData extends Credentials {
  passwordConfirm: string;
  firstname: string;
  lastname: string;
  phone: string;
}
