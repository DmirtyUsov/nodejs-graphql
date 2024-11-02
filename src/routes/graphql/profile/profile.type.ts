import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { ProfileModel } from './profile.model.js';
import { RequestContext } from '../types/request-context.js';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeGQL, MemberTypeIdGQL } from '../member-type/member-type.type.js';
import { UserGQLType } from '../user/user.type.js';

export const ProfileGQLType: GraphQLObjectType<ProfileModel, RequestContext> =
  new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
      id: { type: UUIDType },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      userId: { type: UUIDType },
      memberTypeId: { type: MemberTypeIdGQL },

      user: {
        type: UserGQLType,
        resolve: async (
          parent: ProfileModel,
          _noArgs: unknown,
          context: RequestContext,
        ) => {
          const user = await context.dataLoaders.user.load(parent.userId);
          return user;
        },
      },

      memberType: {
        type: MemberTypeGQL,
        resolve: async (
          parent: ProfileModel,
          _noArgs: unknown,
          context: RequestContext,
        ) => {
          const memberType = await context.dataLoaders.memberType.load(
            parent.memberTypeId,
          );
          return memberType;
        },
      },
    }),
  });
