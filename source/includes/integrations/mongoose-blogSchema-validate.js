import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

// start-blogSchema
const blogSchema = new Schema({
  title:  {
    type: String,
    required: true,
  },
  slug:  {
    type: String,
    required: true,
    lowercase: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  content: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updated: Date,
  comments: [{
    user: String,
    content: String,
    votes: Number
  }]
});
// end-blogSchema

// start-blogSchema-middleware
blogSchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});
// end-blogSchema-middleware

const Blog = model('Blog', blogSchema);
export default Blog;