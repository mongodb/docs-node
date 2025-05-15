import mongoose from 'mongoose';
import Blog from './model/Blog.js';
// start-user-import
import User from './model/User.js';
// end-user-import

mongoose.connect("<connection string>");

// start-article-with-author
// Create a new user
const user = await User.create({
  name: 'Jess Garica',
  email: 'jgarcia@email.com',
});

// Creates a new blog post that references the user as the author
const articleAuthor = await Blog.create({
  title: 'Awesome Post!',
  slug: 'Awesome-Post',
  author: user._id,
  content: 'This is the best post ever',
  tags: ['featured', 'announcement'],
});

console.log('Article with Author:', articleAuthor);
// end-article-with-author

// start-populate-author
// Populates the author field with user data
const articlePopulate = await Blog.findOne({ title: "Awesome Post!" }).populate("author");
console.log('Article Populated:', articlePopulate);
// end-populate-author

// start-middleware-update
// Middleware to update the updated field before saving
const articleUpdated = await Blog.findById("68262cac638b7ec7ed0a086b").exec();
articleUpdated.title = "Updated Title";
await articleUpdated.save();
console.log('Article Updated:', articleUpdated);
// end-middleware-update