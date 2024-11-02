import { PostModel } from '../post/post.model.js';
import { ProfileModel } from '../profile/profile.model.js';

export type UserModel = {
  id: string;
  name: string;
  balance: number;
  profile?: ProfileModel;
  posts?: PostModel[];
};
