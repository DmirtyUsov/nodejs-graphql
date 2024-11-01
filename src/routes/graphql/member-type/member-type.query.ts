import { GraphQLList } from 'graphql';
import { MemberTypeGQL } from './member-type.type.js';
import { ContextType } from '../types/context.type.js';

export const MemberTypeQuery = {
  memberTypes: {
    type: new GraphQLList(MemberTypeGQL),
    description: 'List of all Member Types',
    resolve: async (_obj: unknown, _args: unknown, context: ContextType) => {
      const memberTypes = await context.prismaClient.memberType.findMany();
      return memberTypes;
    },
  },
};
