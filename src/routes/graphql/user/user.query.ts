import { GraphQLList, GraphQLString } from 'graphql';
import { ContextType } from '../types/all.js';
import {} from 'graphql-parse-resolve-info';
import { UserModel } from './user.model.js';
import { UserGQLType } from './user.type.js';

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
    resolve: async (_obj: unknown, _args: unknown, context: ContextType) => {
      const users: UserModel[] = await context.prismaClient.user.findMany();

      users.forEach((user) => {
        context.dataLoaders.userDataLoader.prime(user.id, user);
      });

      return users;
    },
  },
};
