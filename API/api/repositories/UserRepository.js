const db = require("../database/dbContext");
const bcrypt = require("bcrypt");

class UserRepository {
    async createUser(userName, password, email, role, ProfilePicture) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return await db.User.create({
            userName,
            password: hashedPassword,
            email,
            role,
            ProfilePicture 
        });
    }

    async findUserByEmail(email) {
        return await db.User.findOne({ where: { email } });
    }
}

module.exports = new UserRepository();
