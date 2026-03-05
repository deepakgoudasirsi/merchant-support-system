const path = require("path");
const fs = require("fs/promises");

const DATA_FILE = path.join(__dirname, "..", "..", "data", "tickets.json");

async function ensureDataFileExists() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]\n", "utf8");
  }
}

async function readTickets() {
  await ensureDataFileExists();

  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeTickets(tickets) {
  await ensureDataFileExists();

  const tmpFile = `${DATA_FILE}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(tickets, null, 2) + "\n", "utf8");
  await fs.rename(tmpFile, DATA_FILE);
}

async function createTicket(ticket) {
  const tickets = await readTickets();
  tickets.push(ticket);
  await writeTickets(tickets);
  return ticket;
}

async function updateTicket(id, updates) {
  const tickets = await readTickets();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  const updated = { ...tickets[idx], ...updates };
  tickets[idx] = updated;
  await writeTickets(tickets);
  return updated;
}

module.exports = {
  readTickets,
  createTicket,
  updateTicket,
};

