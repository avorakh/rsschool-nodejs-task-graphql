import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { UserType } from './entities.js';
import { CreateUserInputType, } from './inputs.js';

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
        }
    }
});
