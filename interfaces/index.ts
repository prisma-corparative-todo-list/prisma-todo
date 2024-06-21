import { User,Task } from "prisma/prisma-client"


export interface WorkFlow<T,Z> {
    main: T
    items: Z[]
}


export interface IUser extends Omit<User,"id"> {}


export interface ITask extends Omit<Task,"id"> {}



