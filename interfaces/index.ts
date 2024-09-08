import {
  User,
  Task,
  List,
  Message,
  Group,
  Participant,
  Invitation,
} from 'prisma/prisma-client';

export interface WorkFlow<T, Z> {
  main: T;
  items: Z[];
}

export interface IUser extends Omit<User, 'id'> {}

export interface ITask extends Omit<Task, 'id' | 'userId'> {}

export interface ITokensAndUser {
  tokens: {
    refreshToken: string;
    accessToken: string;
  };
  user: User;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IList extends Omit<List, 'id' | 'userId'> {}

export interface ICreateTask {
  title: string;
  listId?: string;
  deadLine: Date | null;
  isImportant?: boolean;
  isToday?: boolean;
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
  user: User;
}

export interface IResponseMessageAndUser {
  data: IMessageAndUser[];
  nextCursor: number | null;
}

export interface ExtendedInvitation extends Invitation {
  groupName: string;
}

export interface IResponseInvitation {
  data: ExtendedInvitation[];
  nextCursor: number | null;
}

export interface ICreateInvitation {
  email: string;
  groupId?: string;
}

export interface ExtendedTask extends Omit<Task, 'listId'> {
  list: List | null;
}

export type Roles = "ADMIN" | "PARTICIPANT";

export interface IGroupWithUserRole extends Group {
  role: Roles;
}

export interface IUserWithUserRole extends User {
  role: Roles;
}