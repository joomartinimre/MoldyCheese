const express = require("express");
const RoleRequestController = require("../controllers/RoleRequestController");
const router = express.Router();

router.post("/requests", RoleRequestController.createRequest);
router.post("/request/approve", RoleRequestController.approveRequest);
router.post("/request/deny", RoleRequestController.denyRequest);
router.get("/request/pending", RoleRequestController.getPendingRequests);

module.exports = router;