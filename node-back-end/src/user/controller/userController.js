const { getUsers, addUser, getByEmail } = require('../service');
const User = require("../../../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function get(req, res) {
  
  try {
    console.log(req.query);

    if (req.query.id) { // ?id=k1231 -> query paramet
      const id = req.query.id;
      const result = await getById(id);
      console.log('result of specific user =>', result);
      return res.send(result);
    }

    const result = await getUsers();
    console.log('result =>', result);

    return res.send(result);
    } catch (error) {
    console.log(error);
  }
}

async function register(req, res) {
  
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await getByEmail({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await addUser({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      `${process.env.TOKEN_SECRET}`,
      {
        expiresIn: "2h",
      },
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function login(req, res) {
  console.log(req.body)
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        `${process.env.TOKEN_SECRET}`,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  get,
  register,
  login,
};