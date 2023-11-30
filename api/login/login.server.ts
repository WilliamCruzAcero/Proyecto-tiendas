import { UnauthorizedError } from "api/shared/errors/unauthorized";

export function verifyLogin(email?: string | null, password?: string | null) {
  if (!email || !password) throw new UnauthorizedError('Unauthorized');
  return {
    id: 536
  }
}