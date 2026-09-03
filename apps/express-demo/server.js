// Minimal Express demo: GET /orders/:id omits tax unless the `orders-v2` flag
// is enabled — one real behaviour bug, one flag, driven entirely over REST so
// flag_proof.control needs no adapter, just an HTTP toggle.
const express = require("express");

const app = express();
app.use(express.json());

const flags = { "orders-v2": "disabled" };
const orders = { 42: { id: 42, currency: "USD", subtotal: 100 } };

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
