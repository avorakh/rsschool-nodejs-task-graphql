import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean } from 'graphql';
import { UUIDType } from './uuid.js'
import { MemberTypeId } from './entities.js';


export const ChangePostInputType = new GraphQLInputObjectType({
    name: "ChangePostInput",
    fields: () => ({
        title: { type: GraphQLString },
        content: { type: GraphQLString },
    }),
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
    name: "ChangeProfileInput",
    fields: () => ({
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeId },
    }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
    name: "ChangeUserInput",
    fields: () => ({
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat }
    }),
});

export const CreatePostInputType = new GraphQLInputObjectType({
    name: "CreatePostInput",
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
    }),
});


export const CreateProfileInputType = new GraphQLInputObjectType({
    name: "CreateProfileInput",
    fields: () => ({
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(UUIDType) },
        memberTypeId: { type: new GraphQLNonNull(MemberTypeId), },
    }),
});


export const CreateUserInputType = new GraphQLInputObjectType({
    name: "CreateUserInput",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) }
    }),
});