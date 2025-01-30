const AuthService = require("../services/AuthService");

class AuthController {
    static async register(req, res) {
        try {
            const { userName, password, email } = req.body;
            const newUser = await AuthService.register(userName, password, email);
            res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login(email, password);
            res.status(200).json(data);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AuthController;