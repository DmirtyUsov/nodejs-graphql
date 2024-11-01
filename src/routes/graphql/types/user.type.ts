import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ContextType, UUIDType } from './all.js';
import { UserModel } from '../models/user.model.js';

export const UserGQLType: GraphQLObjectType = new GraphQLObjectType<
  UserModel,
  ContextType
>({
  name: 'User',
  description: 'Represents a user',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
