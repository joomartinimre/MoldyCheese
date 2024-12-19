// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const router = express.Router();

require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY;

router.post('/register', async (req, res) => {
    const { userName, password, email, role } = req.body;

    try {
        const existingUser = await Users.findOne({ where: { userName } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            userName,
            password: hashedPassword,
            email,
            role,
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await Users.findOne({ where: { userName } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.ID, userName: user.userName }, JWT_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
