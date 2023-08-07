const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryModel } = require("../../models/category.model");
const { CategoryType } = require("../typeDefs/category.type");

const CategoryResolver = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        const categories = await CategoryModel.find({ parent: undefined}).lean();
        return categories;
    }
}

const CategoryChildrenResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { parent } = args;
        const query = parent ? { parent } : {};
        const categories = await CategoryModel.find(query).lean();
        return categories;
    }
}

module.exports = {
    CategoryResolver,
    CategoryChildrenResolver
}