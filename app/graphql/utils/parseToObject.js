function parseToObject(value) {
    if(typeof value === 'object') {
        return value
    }
    if(typeof value === 'string' && value.charAt(0) === "{") {
        return JSON.parse(value)
    }
    return null
}

module.exports = {
    parseToObject,
}