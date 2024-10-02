const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    type: { type: String, required: true }
});

const bloglist = mongoose.model('Bloglist', blogSchema);
module.exports = bloglist;
