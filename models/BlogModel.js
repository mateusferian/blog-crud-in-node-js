const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    body: String,
    author: String,
    createAt: {
        type:Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Blog',blogSchema);