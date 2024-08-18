import { User, Task, List, Message } from 'prisma/prisma-client';

export interface WorkFlow<T, Z> {
  main: T;
  items: Z[];
}

export interface IUser extends Omit<User, 'id'> {}

export interface ITask extends Omit<Task, 'id' | 'userId'> {}

export interface ITokensAndUserId {
  tokens: {
    refreshToken: string;
    accessToken: string;
  }
  userId: string
}

export interface ITokens {
  accessToken: string;
  refreshToken: string
}

export interface IList extends Omit<List, 'id' | 'userId'> {}

export interface ICreateTask {
  title: string;
  listId?: string;
  deadLine: Date | null
  isImportant?: boolean;
}

export interface ICreateGroup {
  name: string;
  filename?: string;
}

export interface ICreateList {
  title?: string;
}

export interface IUpdateList extends ICreateList {}

export interface ICreateStep {
  content: string;
  taskId?: string;
}

export interface IMessageAndUser extends Message {
  user: User
}

export interface IResponseMessageAndUser {
  data: IMessageAndUser[]
  nextCursor: number | null
}

