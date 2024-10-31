import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLList } from 'graphql';
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
          resolve: async () => {
            return prisma.memberType.findMany();
          }
        },
        memberType: {
          type: MemberType,
          args: {
            id: { type: new GraphQLNonNull(MemberTypeId) },
          },
          resolve: async (_source, { id }) => {
            return prisma.memberType.findUnique({
              where: { id },
            });
          },
        },
        posts: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
          resolve: async () => {
            return prisma.post.findMany();
          }
        },
        post: {
          type: PostType,
          args: {
            id: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve: async (_source, { id }) => {
            return prisma.post.findUnique({
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
          resolve: async (_source, { id }) => {
            return prisma.profile.findUnique({
              where: { id },
            });
          },
        },
        users: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
          resolve: async () => {
            return prisma.user.findMany();
          }
        },
        user: {
          type: UserType,
          args: {
            id: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve: async (_source, { id }) => {
            return prisma.user.findUnique({
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
      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
      });
    },
  });
};

export default plugin;
