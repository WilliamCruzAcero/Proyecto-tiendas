// import { UnauthorizedError } from "api/shared/errors/unauthorized";

import { BadRequestError } from "api/shared/errors/babRequest";
import { search } from "./services.server";
import { UnauthorizedError } from "api/shared/errors/unauthorized";

export async function verifyLogin( email?: string, password?: string ) {
  let user ;

  if (!email) throw new BadRequestError("complete el campo Email");
  if (!password) throw new BadRequestError("complete el campo password");
  
  const [existUser] = await  search({
    email
  })
  
  if (!existUser) throw new UnauthorizedError("No existe un usuario con este correo");

  if (!existUser.active) throw new UnauthorizedError("Usuario sin autorización");
  user = existUser
  
  return {
    user
  }
}

// export function verifyLogin(email?: string | null, password?: string | null) {
//   let id = 1;
//   if (!email || !password) throw new UnauthorizedError('Unauthorized');

//   if ( email === 'williamcruzacero@gmail.com') id=2

//   return {
//     id
//   }
// }