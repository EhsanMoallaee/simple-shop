async function getComments(model, id) {
    const findQuery = {
        'comments._id': id
    }
    const comment = await model.findOne(findQuery, {'comments.$': 1});
    return comment ? comment : null;
}
module.exports = {
    getComments,
}
