import { GraphQLList, GraphQLString } from 'graphql';
import { RequestContext, UUIDType } from '../types/all.js';
import {} from 'graphql-parse-resolve-info';
import { UserModel } from './user.model.js';
import { UserGQLType } from './user.type.js';

export const UserQuery = {
  user: {
    type: UserGQLType,
    description: 'A single user',
    args: { id: { type: UUIDType } },
    resolve: async (_parent: unknown, args: { id: string }, context: RequestContext) => {
      const user = await context.dataLoaders.user.load(args.id);
      return user;
    },
  },

  users: {
    type: new GraphQLList(UserGQLType),
    description: 'List of all users',
    resolve: async (_noParent: unknown, _noArgs: unknown, context: RequestContext) => {
      const users: UserModel[] = await context.prismaClient.user.findMany();

      users.forEach((user) => {
        context.dataLoaders.user.prime(user.id, user);
      });

      return users;
    },
  },
};
