import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { MemberTypeModel } from './member-type.model.js';

export const memberTypeDataLoader = (prismaClient: PrismaClient) => {
  const data = new DataLoader(async (ids: Readonly<string[]>) => {
    const memberTypes: MemberTypeModel[] = await prismaClient.memberType.findMany({
      where: { id: { in: ids as string[] } },
    });

    const memberTypesByIds = ids.map((id) =>
      memberTypes.find((memberType) => memberType.id === id),
    );

    return memberTypesByIds;
  });

  return data;
};
