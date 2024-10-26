import "./homePage.css";
import { useNavigate } from "react-router-dom";

function NavBar() {
  return <div id="navbar"></div>;
}

function FoodImage() {
  return <div id="photo"></div>;
}

function NavItems() {
  return (
    <div id="navitems">
      <h1 id="hr">HOSTEL RESIDENT</h1>
      <a href="#" id="Food_QR">
        Food QR
      </a>
      <a href="#" id="Compalints">
        Complaints
      </a>
      <a href="#" id="Profile">
        Profile
      </a>
      <a href="#" id="logout">
        Logout
      </a>
    </div>
  );
}

function MealSelect() {
  const navigate = useNavigate();
  return (
    <div id="ms">
      <p id="Henny_font">Making food choices simpler, every day</p>
      <button id="btn" onClick={() => navigate("/meal-selection")}>
        ..Meal Selection..
      </button>
    </div>
  );
}

function HomePage() {
  return (
    <div id="container">
      <FoodImage />
      <NavBar />
      <NavItems />
      <MealSelect />
    </div>
  );
}

export default HomePage;
