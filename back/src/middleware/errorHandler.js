exports.notFound = function (_req, res) {
  res.status(404).json({ message: "Not found" });
}

// eslint-disable-next-line no-unused-vars
exports.errorHandler = function (err, _req, res, _next) {
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || { value: 1 })[0];
    return res.status(409).json({ message: `${field} already exists` });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation error", detail: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid id" });
  }
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
}

// wrap async route handlers so thrown errors reach errorHandler
exports.ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
