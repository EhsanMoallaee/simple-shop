function parseLiteral(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === "{" ? JSON.parse(valueNode.value) : valueNode;
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value);
        case Kind.OBJECT:
                const obj = Object.create(null);
                valueNode.fields.forEach((field) => {
                    obj[field.name.value] = JSON.stringify()
                })
        default:
            break;
    }
}
module.exports = {
    parseLiteral,
}