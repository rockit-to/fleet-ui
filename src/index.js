import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { BookingProvider } from "./features/stays/booking/BookingContext";
import { SessionProvider } from "./features/session/SessionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <SessionProvider><BookingProvider><App /></BookingProvider></SessionProvider>
        </BrowserRouter>
    </React.StrictMode>
);
