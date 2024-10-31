import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { UserModel } from '../models/user.model.js';

export type ContextType = {
  prismaClient: PrismaClient;
  dataLoaders: {
    userDataLoader: DataLoader<string, UserModel | undefined, string>;
  };
};
