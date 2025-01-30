const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
    async register(userName, password, email, role) {
        const existingUser = await UserRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error("User already exists with this email");
        }
        return await UserRepository.createUser(userName, password, email, role);
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

