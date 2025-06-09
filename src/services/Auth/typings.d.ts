import type { UserRole } from '../Users/typings';

export interface AuthPayload {
  id: string;
  role: UserRole;
  email: string;
}
