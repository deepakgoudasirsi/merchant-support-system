const { PRIORITY_VALUES, STATUS_VALUES } = require("./constants");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateCreateTicketPayload(payload) {
  const errors = {};

  if (!isNonEmptyString(payload?.subject)) {
    errors.subject = "Subject is required.";
  }

  if (!isNonEmptyString(payload?.message)) {
    errors.message = "Message is required.";
  }

  if (!PRIORITY_VALUES.includes(payload?.priority)) {
    errors.priority = `Priority must be one of: ${PRIORITY_VALUES.join(", ")}.`;
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

function validateUpdateStatusPayload(payload) {
  const errors = {};

  if (!STATUS_VALUES.includes(payload?.status)) {
    errors.status = `Status must be one of: ${STATUS_VALUES.join(", ")}.`;
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  validateCreateTicketPayload,
  validateUpdateStatusPayload,
};

