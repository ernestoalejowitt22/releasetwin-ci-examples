# express-demo

~40-line Express app with one real behaviour bug: `GET /orders/:id` omits tax
unless the `orders-v2` flag is enabled.

```bash
npm ci
npm start          # http://localhost:4599

curl localhost:4599/orders/42
# {"id":42,"currency":"USD","subtotal":100,"total":100,"taxed":false}
```

Flag state is in memory, flipped over REST — no adapter needed:

```bash
curl -X PUT -H 'Content-Type: application/json' \
  -d '{"state":"enabled"}' localhost:4599/admin/flags/orders-v2
```

Run the reference cases against it from `ReleaseTwin`:

```bash
API_BASE_URL=http://localhost:4599 \
  dotnet run --project src/ReleaseTwin.Cli -- run examples/cases-express
```

See [docs/express.md](https://github.com/ernestoalejowitt22/ReleaseTwin/blob/main/docs/express.md)
in the engine repo for the full walkthrough.
