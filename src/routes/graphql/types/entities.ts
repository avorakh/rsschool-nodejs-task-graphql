import { GraphQLEnumType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean } from 'graphql';
import { UUIDType } from './uuid.js'

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        BASIC: { value: 'BASIC' },
        BUSINESS: { value: 'BUSINESS' },
    },
});

export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
        discount: { type: new GraphQLNonNull(GraphQLFloat) },
        postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    },
});

export const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export const ProfileType = new GraphQLObjectType({
    name: "Profile",
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberType: {
            type: new GraphQLNonNull(MemberType),
            resolve: async (parent, _, context) => {
                return await context.memberType.findUnique({
                    where: {
                        id: parent.memberTypeId,
                    },
                })
            }
        },
    }),
});

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
        profile: { type: ProfileType },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
            resolve: async (parent, _, context) => {
                return await context.post.findMany({
                    where: {
                        authorId: parent.id,
                    },
                });
            },
        },
        userSubscribedTo: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
            // args: {
            //     id: {
            //         type: UUIDType,
            //     },
            // },
            resolve: async (parent, _, context) => {
                return await context.user.findMany({
                    where: {
                        subscribedToUser: {
                            some: {
                                subscriberId: parent.id,
                            },
                        },
                    },
                })
            }
        },
        subscribedToUser: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
            resolve: async (parent, _, context) => {
                return await context.user.findMany({
                    where: {
                        userSubscribedTo: {
                            some: {
                                authorId: parent.id,
                            },
                        },
                    },
                })
            }
        },
    }),
});