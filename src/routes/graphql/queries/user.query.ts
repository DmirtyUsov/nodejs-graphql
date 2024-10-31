import { GraphQLList, GraphQLResolveInfo, GraphQLString } from 'graphql';
import { ContextType, UserGQLType } from '../types/all.js';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { UserModel } from '../models/user.model.js';

export const UserQuery = {
  greeting: {
    type: GraphQLString,
    description: 'Greetings',
    resolve: () => 'Hello World!',
  },
  user: {
    type: GraphQLString,
    description: 'A single user',
    resolve: () => 'User!',
  },
  users: {
    type: new GraphQLList(UserGQLType),
    description: 'List of all users',
    resolve: async (
      _obj: unknown,
      _args: unknown,
      context: ContextType,
      resolveInfo: GraphQLResolveInfo,
    ) => {
      const fragment = parseResolveInfo(resolveInfo);
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        fragment as ResolveTree,
        resolveInfo.returnType,
      );
      const users: UserModel[] = await context.prismaClient.user.findMany();

      users.forEach((user) => {
        context.dataLoaders.userDataLoader.prime(user.id, user);
      });

      return users;
    },
  },
};
