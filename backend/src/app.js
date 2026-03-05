const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/tickets", ticketRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found." });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error." });
});

module.exports = app;

