import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function readCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function Home() {
  return (
    <div>
      <h1>react-demo</h1>
      <Link data-testid="open-42" to="/detail/42">
        Open order 42
      </Link>
    </div>
  );
}

function Detail() {
  const { id } = useParams();
  return (
    <div>
      <h1>Order detail</h1>
      <div data-testid="detail-id">{id}</div>
    </div>
  );
}

function Admin() {
  const isAdmin = readCookie("demo_role") === "admin";
  return isAdmin ? (
    <div data-testid="admin">Admin area</div>
  ) : (
    <div data-testid="denied">Denied</div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
