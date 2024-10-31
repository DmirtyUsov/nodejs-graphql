import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { UserModel } from '../models/all.js';

export const userDataLoader = (prismaClient: PrismaClient) => {
  const data = new DataLoader(async (ids: Readonly<string[]>) => {
    const users: UserModel[] = await prismaClient.user.findMany({});

    const usersByIds = ids.map((id) => users.find((user) => user.id === id));

    return usersByIds;
  });

  return data;
};
