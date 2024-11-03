import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLList, parse, validate } from 'graphql';
import { MemberType, MemberTypeId, PostType, ProfileType, UserType } from './types/entities.js';
import { UUIDType } from './types/uuid.js'

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQuery',
      fields: {
        memberTypes: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
          resolve: async(_, __, context) => {
            return await context.memberType.findMany();
          }
        },
        memberType: {
          type: MemberType,
          args: {
            id: { type: new GraphQLNonNull(MemberTypeId) },
          },
          resolve: async (_, { id },  context) => {
            return await context.memberType.findUnique({
              where: { id },
            });
          },
        },
        users: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
          resolve: async (_, __, context) => {
            return await context.user.findMany();
          }
        },
        user: {
          type: UserType,
          args: {
            id: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve: async (_, { id }, context) => {
            return await context.user.findUnique({
              where: { id },
            });
          },
        },
        posts: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
          resolve: async (_, __, context) => {
            return await context.post.findMany();
          }
        },
        post: {
          type: PostType,
          args: {
            id: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve: async (_, { id }, context) => {
            return await context.post.findUnique({
              where: { id },
            });
          },
        },
        profiles: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
          resolve: async () => {
            return prisma.profile.findMany();
          }
        },
        profile: {
          type: ProfileType,
          args: {
            id: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve: async (_, { id }, context) => {
            return await context.profile.findUnique({
              where: { id },
            });
          },
        },
      }
    })
  })


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

      const errors = validate(schema, parse(query));
      
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
