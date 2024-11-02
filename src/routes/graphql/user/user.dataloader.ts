import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { UserModel } from './user.model.js';

export const userDataLoader = (prismaClient: PrismaClient) => {
  const data = new DataLoader(async (ids: Readonly<string[]>) => {
    const users: UserModel[] = await prismaClient.user.findMany({
      where: { id: { in: ids as string[] } },
    });

    const dataMap: { [idx: string]: UserModel } = users.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    return ids.map((id) => dataMap[id]);
  });

  return data;
};
