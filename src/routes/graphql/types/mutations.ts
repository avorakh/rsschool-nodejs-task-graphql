import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { UserType, ProfileType } from './entities.js';
import { CreateUserInputType, CreateProfileInputType } from './inputs.js';

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
    }
});
