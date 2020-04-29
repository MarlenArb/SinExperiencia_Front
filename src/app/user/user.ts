import { Rol } from './rol';

export class User {
  idUser: number;
  name: string;
  lastname: string;
  password: string;
  mail: string;
  birthdate: string;
  occupation: string;
  experience: number;
  country: string;
  rol: Rol;
}
