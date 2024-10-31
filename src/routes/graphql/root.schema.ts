import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserQuery } from './queries/all.js';

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({ ...UserQuery }),
  }),

  // mutation: new GraphQLObjectType({
  //   name: 'Mutation',
  //   description: 'Root Mutation',
  //   fields: () => ({}),
  // }),
});
