const RoleRequestService = require("../services/RoleRequestService");

class RoleRequestController {
    async createRequest(req, res) {
        try {
            const { user_id, reason, requested_role } = req.body;
            const request = await RoleRequestService.createRequest(user_id, reason, requested_role);
            res.status(201).json(request);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async approveRequest(req, res) {
        try {
            const { request_id, admin_id } = req.body;
            await RoleRequestService.approveRequest(request_id, admin_id);
            res.status(200).json({ message: "Request approved" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async denyRequest(req, res) {
        try {
            const { request_id, admin_id } = req.body;
            await RoleRequestService.denyRequest(request_id, admin_id);
            res.status(200).json({ message: "Request denied" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPendingRequests(req, res) {
        try {
            const requests = await RoleRequestService.getPendingRequests();
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RoleRequestController();