import { ProfileModel } from '../profile/profile.model.js';

export type UserModel = {
  id: string;
  name: string;
  balance: number;
  profile?: ProfileModel;
};
