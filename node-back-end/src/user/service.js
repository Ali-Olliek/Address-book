const User = require('../../model/User');

async function getUsers() {
  return await User.find();
  // return await Task.find().populate('user');
}


async function addUser(body, hashPassword) {
  const {
    name,
    email,
  } = body;
  const user = new User({
    name,
    email,
    password: hashPassword
  });

  return await user.save();
}

async function getByEmail(email) {
  return await User.findOne({
    email
  });
}

module.exports = {
  getUsers,
  addUser,
  getByEmail,
}