jest.mock("../api/database/dbContext", () => require("../__mocks__/db"));
require("dotenv").config();

const authService = require("../api/services/AuthService");
const userRepository = require("../api/repositories/UserRepository");

describe("AuthService", () => {
    beforeAll(async () => {
        await require("../__mocks__/db").sequelize.sync({ force: true });
    });

    describe("Register", () => {
        test("Should create a new user successfully", async () => {
            const userData = {
                userName: "TestUser",
                password: "TestPassword123",
                email: "testuser@email.com"
            };

            const newUser = await authService.register(userData.userName, userData.password, userData.email);
            
            expect(newUser).toHaveProperty("userName", "TestUser");
            expect(newUser).toHaveProperty("email", "testuser@email.com");
            expect(newUser).toHaveProperty("role", "user");
        });

        test("Should throw error if required fields are missing", async () => {
            await expect(authService.register("", "password123", "email@email.com"))
                .rejects
                .toThrow("All fields (username, password, email) are required");

            await expect(authService.register("User", "", "email@email.com"))
                .rejects
                .toThrow("All fields (username, password, email) are required");

            await expect(authService.register("User", "password123", ""))
                .rejects
                .toThrow("All fields (username, password, email) are required");
        });

        test("Should throw error if password is less than 6 characters", async () => {
            await expect(authService.register("User", "123", "email2@email.com"))
                .rejects
                .toThrow("Password must be at least 6 characters long");
        });

        test("Should throw error if email format is invalid", async () => {
            await expect(authService.register("User", "password123", "invalid-email"))
                .rejects
                .toThrow("Invalid email format");
        });

        test("Should not allow duplicate email registration", async () => {
            const userData = {
                userName: "AnotherUser",
                password: "AnotherPassword123",
                email: "testuser@email.com" 
            };
            
            await expect(authService.register(userData.userName, userData.password, userData.email))
                .rejects
                .toThrow("User already exists with this email");
        });
    });

    describe("Login", () => {
        test("Should login successfully with correct credentials", async () => {
            const loginData = {
                email: "testuser@email.com",
                password: "TestPassword123"
            };

            const loginResponse = await authService.login(loginData.email, loginData.password);
            
            expect(loginResponse).toHaveProperty("token");
            expect(loginResponse.user).toHaveProperty("email", "testuser@email.com");
        });

        test("Should reject login with incorrect password", async () => {
            const loginData = {
                email: "testuser@email.com",
                password: "WrongPassword"
            };

            await expect(authService.login(loginData.email, loginData.password))
                .rejects
                .toThrow("Invalid email or password");
        });

        test("Should reject login for non-existent user", async () => {
            const loginData = {
                email: "nonexistent@email.com",
                password: "SomePassword"
            };

            await expect(authService.login(loginData.email, loginData.password))
                .rejects
                .toThrow("Invalid email or password");
        });
    });
});
