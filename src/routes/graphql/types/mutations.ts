import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { UserType, ProfileType, PostType } from './entities.js';
import { CreateUserInputType, CreateProfileInputType, CreatePostInputType, ChangePostInputType, ChangeUserInputType } from './inputs.js';
import { UUIDType } from './uuid.js'

export const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        createUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                dto: { type: new GraphQLNonNull(CreateUserInputType) },
            },
            resolve: async (_, { dto }, context) => {
                return await context.user.create({
                    data: dto,
                });
            }
        },
        createProfile: {
            type: new GraphQLNonNull(ProfileType),
            args: {
                dto: { type: new GraphQLNonNull(CreateProfileInputType) },
            },
            resolve: async (_, { dto }, context) => {
                return await context.profile.create({
                    data: dto,
                });
            }
        },
        createPost: {
            type: new GraphQLNonNull(PostType),
            args: {
                dto: { type: new GraphQLNonNull(CreatePostInputType) },
            },
            resolve: async (_, { dto }, context) => {
                return await context.post.create({
                    data: dto,
                });
            }
        },
        changePost: {
            type: new GraphQLNonNull(PostType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangePostInputType) },
            },
            resolve: async (_, { id, dto }, context) => {
                return await context.post.update({
                    where: { id: id },
                    data: dto,
                });
            }
        },
        changeProfile: {
            type: new GraphQLNonNull(ProfileType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(CreateProfileInputType) },
            },
            resolve: async (_, args, context) => {
                return await context.profile.update({
                    where: { id: args.id },
                    data: args.dto,
                });
            }
        },
        changeUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeUserInputType) },
            },
            resolve: async (_, args, context) => {
                return await context.user.update({
                    where: { id: args.id },
                    data: args.dto,
                });
            }
        },
        deleteUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) }
            },
            resolve: async (_, args, context) => {
                return await context.user.delete({
                    where: {
                        id: args.id,
                    },
                });
            }
        },
    }
});
