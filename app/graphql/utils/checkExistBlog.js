const { BlogModel } = require("../../models/blog.model");

async function checkExistBlog(id) {
    const blog = await BlogModel.findById(id);
    return blog ? blog : {};
}

module.exports = {
    checkExistBlog,
}