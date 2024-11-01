import { GraphQLList } from 'graphql';
import { MemberType } from '../types/member-type.type.js';
import { ContextType } from '../types/context.type.js';

export const MemberTypeQuery = {
  memberTypes: {
    type: new GraphQLList(MemberType),
    description: 'List of all Member Types',
    resolve: async (_obj: unknown, _args: unknown, context: ContextType) => {
      const memberTypes = await context.prismaClient.memberType.findMany();
      return memberTypes;
    },
  },
};
