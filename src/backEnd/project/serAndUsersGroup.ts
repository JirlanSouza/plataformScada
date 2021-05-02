import { Id } from './Id';

export type ProjectUserAndUsersGroup = {
  usersGroups: {
    id: Id;
    name: string;
    acessLevel: number;
  }[];
  users: {
    group: Id;
    name: string;
    userName: string;
    password: string;
  }[];
};
