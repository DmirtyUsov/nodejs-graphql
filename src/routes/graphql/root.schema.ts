import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { MemberTypeQuery, UserQuery } from './queries/all.js';

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({ ...UserQuery, ...MemberTypeQuery }),
  }),

  // mutation: new GraphQLObjectType({
  //   name: 'Mutation',
  //   description: 'Root Mutation',
  //   fields: () => ({}),
  // }),
});
