import { BadRequestError } from "api/shared/errors/babRequest";
import { search } from "./services.server";
import { UnauthorizedError } from "api/shared/errors/unauthorized";

export async function verifyLogin( data: any ) {
  let user ;
  const isEmailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  if (!isEmailRegExp.test(data.email)) throw new BadRequestError('Debe ser un correo valido.');
  
  const [existUser] = await  search({
    email: data.email
  })
 
  if (!existUser) throw new UnauthorizedError("No existe un usuario con este correo");

  if (!existUser.active) throw new UnauthorizedError("Usuario sin autorización");
  const hashedPassword = existUser.password;
  console.log('password database: ', hashedPassword);
  console.log('password login: ', data.password);
  
  // const isCorrectPassword = await bcrypt.compare(data.password, hashedPassword) 

  //       if (!isCorrectPassword) {
  //           throw new WebError('El nombre de usuario o contraseña es incorrecta',  StatusCodes.UNAUTHORIZED);
  //       }

  user = existUser
  
  return {
    user
  }
}