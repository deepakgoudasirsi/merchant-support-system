const ticketService = require("../services/ticketService");
const {
  validateCreateTicketPayload,
  validateUpdateStatusPayload,
} = require("../utils/validateTicket");

async function createTicket(req, res) {
  const { ok, errors } = validateCreateTicketPayload(req.body);
  if (!ok) {
    return res.status(400).json({ message: "Invalid request body.", errors });
  }

  const ticket = await ticketService.createNewTicket(req.body);
  return res.status(201).json(ticket);
}

async function getTickets(req, res) {
  const tickets = await ticketService.listTickets();
  return res.status(200).json(tickets);
}

async function updateTicketStatus(req, res) {
  const { ok, errors } = validateUpdateStatusPayload(req.body);
  if (!ok) {
    return res.status(400).json({ message: "Invalid request body.", errors });
  }

  const updated = await ticketService.changeTicketStatus(req.params.id, req.body.status);
  if (!updated) {
    return res.status(404).json({ message: "Ticket not found." });
  }

  return res.status(200).json(updated);
}

module.exports = {
  createTicket,
  getTickets,
  updateTicketStatus,
};

