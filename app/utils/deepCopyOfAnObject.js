function deepCopyOfAnObject(object) {
    return JSON.parse(JSON.stringify(object));
}

module.exports = {
    deepCopyOfAnObject,
}