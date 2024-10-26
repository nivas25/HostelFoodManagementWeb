// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./Login/Login";
// import HomePage from "./Home_page/homePage";
// import MealSelectionPage from "./MealSelection/MealSelection";
// import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         {/* Home Page Route */}
//         <Route path="/" element={<LoginPage />} />

//         {/* Meal Selection Page Route */}
//         <Route path="/meal-selection" element={<MealSelectionPage />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>
// );

// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Login/Login";
import HomePage from "./resident/Home_page/homePage";
import MealSelectionPage from "./resident/MealSelection/MealSelection";
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

        {/* Additional Routes for Other Actors */}
        {/* Example:
          <Route path="/warden/home" element={<WardenHomePage />} />
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/kitchen/home" element={<KitchenHomePage />} />
        */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
