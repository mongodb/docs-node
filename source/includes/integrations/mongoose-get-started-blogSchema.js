import mongoose from 'mongoose';
// start-blogSchema-import
import Blog from './model/Blog.js';
// end-blogSchema-import

mongoose.connect("<connection string>");

// start-insert
// Creates a new blog post and inserts it into database
const article = await Blog.create({
  title: 'Awesome Post!',
  slug: 'awesome-post',
  published: true,
  content: 'This is the best post ever',
  tags: ['featured', 'announcement'],
});

console.log('Created article:', article);
// end-insert

// start-update
article.title = "The Most Awesomest Post!!";
await article.save();
console.log('Updated Article:', article);
// end-update

// start-find-by-id
const articleFound = await Blog.findById("<object id>").exec();
console.log('Found Article by ID:', articleFound);
// end-find-by-id

// start-project-fields
const articleProject = await Blog.findById("<object id>", "title slug content").exec();
console.log('Projected Article:', articleProject);
// end-project-fields

// start-delete-one
const blogOne = await Blog.deleteOne({ slug: "awesome-post" });
console.log('Deleted One Blog:', blogOne);
// end-delete-one

// start-delete-many
const blogMany = await Blog.deleteMany({ slug: "awesome-post" });
console.log('Deleted Many Blogs:', blogMany);
// end-delete-many