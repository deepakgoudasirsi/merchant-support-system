const { createTicket, readTickets, updateTicket } = require("../models/ticketModel");
const { STATUSES } = require("../utils/constants");

function createId() {
  // Simple, stable-enough ID for take-home usage (no extra deps).
  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

async function listTickets() {
  const tickets = await readTickets();
  return tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function createNewTicket({ subject, message, priority }) {
  const ticket = {
    id: createId(),
    subject: subject.trim(),
    message: message.trim(),
    priority,
    status: STATUSES.NEW,
    createdAt: new Date().toISOString(),
  };

  return await createTicket(ticket);
}

async function changeTicketStatus(id, status) {
  return await updateTicket(id, { status });
}

module.exports = {
  listTickets,
  createNewTicket,
  changeTicketStatus,
};

