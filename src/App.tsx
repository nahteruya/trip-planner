import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateTripPage />} />
        <Route path="/trips/:tripId" element={<TripDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
