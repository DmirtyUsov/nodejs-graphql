import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { MemberTypeModel } from './member-type.model.js';
import { ContextType } from '../types/context.type.js';

export const MemberTypeEnum = new GraphQLEnumType({
  name: 'MemberTypeEnum',
  description: 'Values for MemberTypeId',
  values: {
    basic: { value: 'BASIC' },
    business: { value: 'BUSINESS' },
  },
});

export const MemberTypeGQL: GraphQLObjectType<MemberTypeModel, ContextType> =
  new GraphQLObjectType({
    name: 'MemberTypes',
    description: '',
    fields: () => ({
      id: { type: new GraphQLNonNull(MemberTypeEnum) },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
      profiles: {
        type: GraphQLString,
        description: 'Profiles with ID',
        resolve: () => 'Profiles',
      },
    }),
  });
