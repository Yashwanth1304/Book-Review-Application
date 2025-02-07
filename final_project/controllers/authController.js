const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');

// Register a new user
const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required!' });
    }

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).send({ message: 'Username already exists!' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user!' });
    }
};

// Login a user
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required!' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).send({ message: 'Invalid username or password!' });
        }

        const token = generateToken(username);
        res.status(200).send({ message: 'Login successful!', token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in!' });
    }
};

module.exports = { register, login };
