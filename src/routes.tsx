import { MemoryRouter, Routes, Route } from "react-router-dom";
import Checkout from "./features/checkout/pages/Checkout";

export function AppRouter() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Checkout />} />
        {/* Andere routes kunnen hier worden toegevoegd */}
      </Routes>
    </MemoryRouter>
  );
}