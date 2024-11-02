import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { RequestContext, UUIDType } from '../types/all.js';
import { UserModel } from './user.model.js';
import { ProfileGQLType } from '../profile/profile.type.js';
import { PostGQLType } from '../post/post.type.js';

export const UserGQLType: GraphQLObjectType = new GraphQLObjectType<
  UserModel,
  RequestContext
>({
  name: 'User',
  description: 'Represents a user',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileGQLType,
      resolve: async (parent: UserModel, _noArgs: unknown, context: RequestContext) => {
        const profile = await context.dataLoaders.profileByUser.load(parent.id);
        return profile;
      },
    },
    posts: {
      type: PostGQLType,
      resolve: async (parent: UserModel, _noArgs: unknown, context: RequestContext) => {
        const posts = await context.dataLoaders.postByUser.load(parent.id);
        return posts;
      },
    },
  }),
});
