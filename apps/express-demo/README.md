# express-demo

Small Express app with two real behaviour bugs, each behind its own flag.

```bash
npm ci
npm start          # http://localhost:4599

curl localhost:4599/orders/42
# {"id":42,"currency":"USD","subtotal":100,"total":100,"taxed":false}
```

**`orders-v2`**: `GET /orders/:id` omits tax unless enabled.

**`currency-normalization`**: `POST /orders` doesn't upper-case a lowercase
currency code unless enabled:

```bash
curl -X POST -H 'Content-Type: application/json' \
  -d '{"currency":"usd","subtotal":100}' localhost:4599/orders
# {"id":100,"currency":"usd","subtotal":100}   <- the bug
```

Flag state is in memory, flipped over REST — no adapter needed:

```bash
curl -X PUT -H 'Content-Type: application/json' \
  -d '{"state":"enabled"}' localhost:4599/admin/flags/orders-v2
# or: localhost:4599/admin/flags/currency-normalization
```

Run the reference cases against it from `ReleaseTwin`:

```bash
API_BASE_URL=http://localhost:4599 \
  dotnet run --project src/ReleaseTwin.Cli -- run examples/cases-express
```

See [docs/express.md](https://github.com/ernestoalejowitt22/ReleaseTwin/blob/main/docs/express.md)
in the engine repo for the full walkthrough.
