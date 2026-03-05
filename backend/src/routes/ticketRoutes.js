const express = require("express");
const ticketController = require("../controllers/ticketController");

const router = express.Router();

router.get("/", ticketController.getTickets);
router.post("/", ticketController.createTicket);
router.patch("/:id", ticketController.updateTicketStatus);

module.exports = router;

