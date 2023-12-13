import { Role } from './enums/Role';

export interface AuthUser {
  id: number
  email: string
  firstName: string
  lastName: string
  role: Role
}
