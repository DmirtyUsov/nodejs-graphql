import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { UserModel } from '../user/user.model.js';
import { MemberTypeModel } from '../member-type/member-type.model.js';

export type ContextType = {
  prismaClient: PrismaClient;
  dataLoaders: {
    userDataLoader: DataLoader<string, UserModel | undefined, string>;
    memberTypeDataLoader: DataLoader<string, MemberTypeModel | undefined, string>;
  };
};
