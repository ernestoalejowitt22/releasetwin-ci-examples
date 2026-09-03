# angular-demo

Minimal Angular SPA: the same shape as `react-demo` — one home screen, one
client-side route change, one rendered value — exactly what
`examples/cases-spa/angular-journey.yaml` (in `ReleaseTwin`) drives.

```bash
npm ci
npm run build
npm run preview   # http://localhost:4174
```

Run the reference cases against it (needs `RELEASETWIN_UI_ENABLED=1`, since the
UI adapter launches a real browser):

```bash
RELEASETWIN_UI_ENABLED=1 SPA_BASE_URL=http://localhost:4174 API_BASE_URL=https://postman-echo.com \
  dotnet run --project src/ReleaseTwin.Cli -- run examples/cases-spa
```

See [docs/spa-testing.md](https://github.com/ernestoalejowitt22/ReleaseTwin/blob/main/docs/spa-testing.md)
in the engine repo for the full walkthrough.
