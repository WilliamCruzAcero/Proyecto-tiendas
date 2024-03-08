import { UnauthorizedError } from "api/shared/errors/unauthorized";

export function verifyLogin(email?: string | null, password?: string | null) {
  let id = 1;
  if (!email || !password) throw new UnauthorizedError('Unauthorized');

  if ( email === 'williamcruzacero@gmail.com') id=2

  return {
    id
  }
}
