const RoleRequestRepository = require("../repositories/RoleRequestRepository");

const VALID_ROLES = [
    "Étterem kritikus",
    "Játszótér szakértő",
    "Iskológus",
    "Vegyesbolt vegyész"
];

class RoleRequestService {
    async createRequest(userId, reason, requestedRole) {
        if (!VALID_ROLES.includes(requestedRole)) {
            throw new Error("Invalid role request");
        }
        
        const hasPending = await RoleRequestRepository.hasPendingRequest(userId);
        if (hasPending) {
            throw new Error("Már jelentkeztél kritikusnak, kérésedet egy szakértő hamarosan elbírálja");
        }
        
        return await RoleRequestRepository.createRequest(userId, reason, requestedRole);
    }

    async approveRequest(requestId, adminId) {
        return await RoleRequestRepository.updateRequestStatus(requestId, "approved", adminId);
    }

    async denyRequest(requestId, adminId) {
        return await RoleRequestRepository.updateRequestStatus(requestId, "rejected", adminId);
    }

    async getPendingRequests() {
        return await RoleRequestRepository.getPendingRequests();
    }
}

module.exports = new RoleRequestService();
