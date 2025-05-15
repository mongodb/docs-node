import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// start-schema-example
const blog = new Schema({
  title: String,
  slug: String,
  published: Boolean,
  author: String,
  content: String,
  tags: [String],
  createdAt: Date,
  updated: Date,
  comments: [{
    user: String,
    content: String,
    votes: Number
  }]
});
// end-schema-example
const Blog = model('Blog', blogSchema);
export default Blog;