import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { rootSchema } from './root.schema.js';
import { ContextType } from './types/all.js';

import { memberTypeDataLoader } from './member-type/member-type.dataloader.js';
import { userDataLoader } from './user/user.dataloader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const contextValue: ContextType = {
        prismaClient: fastify.prisma,
        dataLoaders: {
          userDataLoader: userDataLoader(prisma),
          memberTypeDataLoader: memberTypeDataLoader(prisma),
        },
      };
      const { data, errors } = await graphql({
        schema: rootSchema,
        source: query,
        variableValues: variables,
        contextValue,
      });

      return { data, errors };
    },
  });
};

export default plugin;
