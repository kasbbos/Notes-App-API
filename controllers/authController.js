const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function register(req, res) {
  const { username, password } = req.body;
  const user = await createUser(username, password);
  res.status(201).json({ message: 'User registered', user });
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}

module.exports = { register, login };
