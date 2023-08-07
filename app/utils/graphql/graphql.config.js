const { appGraphqlSchema } = require("../../graphql/index.graphql")

function graphqlConfig(req, res) {
    return {
        schema: appGraphqlSchema,
        graphiql: true,
        context: { req, res }
    }
}

module.exports = {
    graphqlConfig
}