import mongoose from 'mongoose';
import User from './model/User.js';
// start-user-import
import User from './model/User.js';
// end-user-import

mongoose.connect("<connection string>");

// start-create-user-bad-email
const user = await User.create({
  name: 'Jess Garica',
  email: 'jgarciaemail.com',
});
// end-create-user-bad-email

// start-create-user-ok-email
const user = await User.create({
  name: 'Jess Garica',
  email: 'jgarcia@email.com',
});
// end-create-user-ok-email

