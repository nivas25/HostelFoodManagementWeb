import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Login/Login";
import HomePage from "./resident/Home_page/homePage";
import MealSelectionPage from "./resident/MealSelection/MealSelection";
import FoodQR from "./resident/FoodQR/FoodQR";
import ResProfile from "./resident/ResProfile/ResProfile";
import WardenHomePage from "./warden/HomePage/homePage";
import KitchenHomePage from "./kitchen/HomePage/homePage";
import AdminHomePage from "./admin/homePage";

// Import additional components for each actor here
import reportWebVitals from "./reportWebVitals";

// Main app entry point
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Home Page for Hostel Resident */}
        <Route path="/resident_home" element={<HomePage />} />

        {/* Meal Selection Page Route for Hostel Resident */}
        <Route path="/meal-selection" element={<MealSelectionPage />} />

        <Route path="/foodqr" element={<FoodQR />} />

        <Route path="/residentprofile" element={<ResProfile />} />

        <Route path="/wardernHome" element={<WardenHomePage />} />

        <Route path="/kitchenHome" element={<KitchenHomePage />} />

        <Route path="/adminHome" element={<AdminHomePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
