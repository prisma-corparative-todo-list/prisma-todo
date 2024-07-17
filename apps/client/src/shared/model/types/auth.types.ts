
import { User } from "prisma/prisma-client"

export interface ISingupFormData extends Pick<User,"userName" | "email" > {
    password: string;
 }

 export interface ISinginForm  {
    password: string;
    login: string
 }