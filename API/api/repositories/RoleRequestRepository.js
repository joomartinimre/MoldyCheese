const db = require("../database/dbContext");

class RoleRequestRepository {
    async createRequest(userId, reason, requestedRole) {
        return await db.RoleRequest.create({ user_id: userId, reason, requested_role: requestedRole });
    }

    async updateRequestStatus(requestId, status, adminId) {
        return await db.RoleRequest.update(
            { status, processed_by: adminId, updatedAt: new Date() },
            { where: { id: requestId } }
        );
    }

    async hasPendingRequest(userId) {
        const request = await db.RoleRequest.findOne({
            where: { user_id: userId, status: "pending" }
        });
        return !!request;
    }

    async getPendingRequests() {
        console.log("User associations:", db.User.associations);
        console.log("RoleRequest associations:", db.RoleRequest.associations);

        return await db.RoleRequest.findAll({
            where: { status: "pending" },
            include: [{ model: db.User, as: "User", attributes: ["userName"] }]
        });
    }
}

module.exports = new RoleRequestRepository();