import { GraphQLObjectType, GraphQLNonNull, GraphQLList, } from 'graphql';
import { MemberType, MemberTypeId, PostType, ProfileType, UserType } from './entities.js';
import { UUIDType } from './uuid.js'

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
            resolve: async (_, __, context) => {
                return await context.memberType.findMany();
            }
        },
        memberType: {
            type: MemberType,
            args: {
                id: { type: new GraphQLNonNull(MemberTypeId) },
            },
            resolve: async (_, { id }, context) => {
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
            resolve: async (_, __, context) => {
                return await context.profile.findMany();
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

