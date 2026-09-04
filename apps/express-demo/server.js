// Minimal Express demo, two real behaviour bugs, each behind its own flag,
// both driven entirely over REST so flag_proof.control needs no adapter,
// just an HTTP toggle:
//   - GET /orders/:id omits tax unless `orders-v2` is enabled.
//   - POST /orders doesn't normalize a lowercase currency code unless
//     `currency-normalization` is enabled.
const express = require("express");

const app = express();
app.use(express.json());

// `maintenance-mode` is a plain operational flag, never toggled by any
// flag_proof case in this demo — a stable value for a contract case to
// introspect via GET /admin/flags/:key, unlike orders-v2/currency-normalization
// which flag-proof cases mutate as part of the same shared app process.
const flags = { "orders-v2": "disabled", "currency-normalization": "disabled", "maintenance-mode": "disabled" };
const orders = { 42: { id: 42, currency: "USD", subtotal: 100 } };
let nextOrderId = 100;

app.post("/orders", (req, res) => {
  const { currency, subtotal } = req.body;
  const normalize = flags["currency-normalization"] === "enabled";
  const resolvedCurrency = normalize && typeof currency === "string" ? currency.toUpperCase() : currency;

  const order = { id: nextOrderId++, currency: resolvedCurrency, subtotal: subtotal ?? 0 };
  orders[order.id] = order;
  res.status(201).json(order);
});

app.get("/orders/:id", (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.status(404).json({ error: "not found" });

  const taxed = flags["orders-v2"] === "enabled";
  const total = taxed ? Math.round(order.subtotal * 1.1) : order.subtotal;

  res.json({ ...order, total, taxed });
});

app.get("/admin/flags/:key", (req, res) => {
  const state = flags[req.params.key];
  if (state === undefined) return res.status(404).json({ error: "unknown flag" });
  res.json({ key: req.params.key, state });
});

app.put("/admin/flags/:key", (req, res) => {
  const { state } = req.body;
  if (state !== "enabled" && state !== "disabled") {
    return res.status(400).json({ error: "state must be 'enabled' or 'disabled'" });
  }
  if (!(req.params.key in flags)) return res.status(404).json({ error: "unknown flag" });
  flags[req.params.key] = state;
  res.json({ key: req.params.key, state });
});

const port = process.env.PORT || 4599;
app.listen(port, () => console.log(`express-demo listening on :${port}`));

module.exports = app;
