import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { UserModel } from '../models/user.model.js';
import { MemberTypeModel } from '../models/member-type.model.js';

export type ContextType = {
  prismaClient: PrismaClient;
  dataLoaders: {
    userDataLoader: DataLoader<string, UserModel | undefined, string>;
    memberTypeDataLoader: DataLoader<string, MemberTypeModel | undefined, string>;
  };
};
