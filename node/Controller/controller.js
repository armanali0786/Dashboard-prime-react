// const bcrypt = require('bcryptjs');
const User = require('../Models/users');

exports.getFetchDataUser = async (req, res, next) => {
  try {
    const userData = await User.find()
    res.status(200).json(userData)
  } catch (error) {
    console.log(error);
  }
};