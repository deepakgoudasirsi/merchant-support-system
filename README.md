# Merchant Support System

## Project Overview
A small full-stack support ticket system built as a practical technical assessment. It simulates a simple internal tool with a clean backend structure (controller -> service -> model) and a lightweight React dashboard for creating and managing tickets.

## Tech Stack
- **Backend**: Node.js, Express
- **Frontend**: React (Vite), Tailwind CSS
- **Storage**: JSON file (`backend/data/tickets.json`)
- **API**: REST over HTTP (fetch)

## Backend Setup
From the repo root:

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:3001`.

## Frontend Setup
From the repo root:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and proxies `/api` to the backend.

## API Endpoints
### Create Ticket
`POST /api/tickets`

Body:
```json
{
  "subject": "string",
  "message": "string",
  "priority": "LOW | MEDIUM | HIGH"
}
```

### Get All Tickets
`GET /api/tickets`

### Update Ticket Status
`PATCH /api/tickets/:id`

Body:
```json
{
  "status": "NEW | INVESTIGATING | RESOLVED"
}
```

## Project Structure
```
merchant-support-system
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   └── ticketController.js
│   │   ├── routes
│   │   │   └── ticketRoutes.js
│   │   ├── services
│   │   │   └── ticketService.js
│   │   ├── models
│   │   │   └── ticketModel.js
│   │   ├── utils
│   │   │   ├── constants.js
│   │   │   └── validateTicket.js
│   │   ├── app.js
│   │   └── server.js
│   ├── data
│   │   └── tickets.json
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── TicketForm.jsx
│   │   │   ├── TicketList.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── pages
│   │   │   └── Dashboard.jsx
│   │   ├── services
│   │   │   └── ticketApi.js
│   │   ├── utils
│   │   │   └── statusColors.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

