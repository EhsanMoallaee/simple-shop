const { Kind } = require("graphql");

function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value;
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value);
        case Kind.OBJECT:
            return parseObject(valueNode.value);
        case Kind.LIST:
            return valueNode.values.map(parseValueNode);
        default:
            return null;
    }
}

function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach((field) => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}
module.exports = {
    parseValueNode,
    parseObject,
}