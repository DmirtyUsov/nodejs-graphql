import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { MemberTypeModel } from './member-type.model.js';
import { RequestContext } from '../types/request-context.js';

export const MemberTypeIdGQL = new GraphQLEnumType({
  name: 'MemberTypeEnum',
  description: 'Values for MemberTypeId',
  values: {
    basic: { value: 'BASIC' },
    business: { value: 'BUSINESS' },
  },
});

export const MemberTypeGQL: GraphQLObjectType<MemberTypeModel, RequestContext> =
  new GraphQLObjectType({
    name: 'MemberTypes',
    description: '',
    fields: () => ({
      id: { type: new GraphQLNonNull(MemberTypeIdGQL) },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
      profiles: {
        type: GraphQLString,
        description: 'Profiles with ID',
        resolve: () => 'Profiles',
      },
    }),
  });
