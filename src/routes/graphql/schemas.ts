import { Type } from '@fastify/type-provider-typebox';
import { RootQueryType } from './types/root_query.js';
import { GraphQLSchema } from 'graphql';
import { Mutations } from './types/mutations.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};


export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations
})