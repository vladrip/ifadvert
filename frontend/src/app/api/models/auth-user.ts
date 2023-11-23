import { Role } from './enums/role';

export interface AuthUser {
  id: number
  email: string
  firstName: string
  lastName: string
  role: Role
}
