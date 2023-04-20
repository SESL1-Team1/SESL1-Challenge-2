const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    // Check if all fields are filled in
    if (!name || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user already exists - if two of the same name exist, checks by password
    const userExists = await User.find({ name });
    for (let i = 0; i < userExists.length; i++) {
        if ((await bcrypt.compare(password, userExists[i].password))) {
            res.status(400);
            throw new Error('User already exists');
        }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id),
        })

    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    let user = await User.find({ name });
    for (let i = 0; i < user.length; i++) {
        if (await bcrypt.compare(password, user[i].password)) {
            user = user[i];
            break;
        }
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id),
        });

    } else {
        res.status(401);
        throw new Error('Invalid name or password');
    }
});

const getUserData = asyncHandler(async (req, res) => {
    const { _id, name, tasks } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        tasks,
    });
});

// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

};

module.exports = {
    registerUser,
    loginUser,
    getUserData,
};