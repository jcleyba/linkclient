import { ROLES, ADMIN } from './constants';

export const isAdmin = user => {
  return user && ROLES[user.id_UserType] === ADMIN;
};
