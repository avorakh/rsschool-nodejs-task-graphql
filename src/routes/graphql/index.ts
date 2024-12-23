import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit  from 'graphql-depth-limit';


const MAX_DEPTH: number = 5;

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

      const errors = validate(schema, parse(query), [depthLimit(MAX_DEPTH)]);
      
      if (errors.length > 0) {
        return { errors };
      } 
      
      return graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: prisma
      });
    },
  });
};

export default plugin;
