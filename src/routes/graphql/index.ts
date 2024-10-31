import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLList } from 'graphql';
import { MemberType, MemberTypeId, PostType, ProfileType, UserType } from './types/entities.js';


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
        posts: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
          resolve: async () => {
            return prisma.post.findMany();
          }
        },
        profiles: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
          resolve: async () => {
            return prisma.profile.findMany();
          }
        },
        users: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
          resolve: async () => {
            return prisma.user.findMany();
          }
        },
        // memberType: {
        //   type: MemberType,
        //   args: {
        //     id: { type: new GraphQLNonNull(MemberTypeId) },
        //   },
        //   resolve: async (_, args) => {
        //    return await prisma.memberType.findUnique({
        //       where: {
        //         id: args.id,
        //       },
        //     })
        //   },
        // },
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
