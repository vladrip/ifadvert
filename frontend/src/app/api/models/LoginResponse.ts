import { AuthUser } from './AuthUser';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
