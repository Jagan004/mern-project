const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {

  const user = await User.find()
  res.status(200).json(user);
}


const login = async (req, res, next) => {
  const { name, password } = req.body;
  // const token = req.headers.authorization;
  // if (!token) {
  //   return res.status(401).json({ message: 'No token provided' });
  // }
  try {
    // Find the user by name
    const user = await User.findOne({ name });

    if (!name || !password) {
      res.status(404).json({ message: "please enter the credential" });
      return;
    }
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const accessToken = jwt.sign({
          id: User.id
      }, process.env.ACCESS_TOKEN_SECERT,{
        expiresIn:"30m"
      })
      res.status(200).json({ message: 'Login successful',currentUser:user, token: accessToken });

    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error('Failed to login:', error);
    res.status(500).send('Failed to login');
  }
};


const createUser = async (req, res) => {

  const { name, email, phone, password } = req.body

  if (!name || !email || !phone || !password) {
    res.status(400).json({ message: "All fields are manditory" });
    return;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword
  })
  res.status(200).json(user);
}

module.exports = { getUser, login, createUser }