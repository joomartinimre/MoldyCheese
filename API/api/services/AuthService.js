const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

class AuthService {
    async register(userName, password, email, role) {
        if (!userName || !password || !email) {
            throw new Error("All fields (username, password, email) are required");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        const existingUser = await UserRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error("User already exists with this email");
        }

        const defaultProfilePictureUrl = `http://localhost:3000/api/user/image/defaultPP.jpg`;


        return await UserRepository.createUser(userName, password, email, role, defaultProfilePictureUrl);
    }

    async login(email, password) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            { id: user.ID, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return { token, user };
    }
}

module.exports = new AuthService();
