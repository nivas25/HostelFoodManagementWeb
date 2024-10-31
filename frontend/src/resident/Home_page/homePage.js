import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function HomeNavBar() {
  return <div id="Homenavbar"></div>;
}

function FoodImage() {
  return <div id="photo"></div>;
}

function NavItems() {
  return (
    <div id="Homenavitems">
      <h1 id="Homehr">HOSTEL RESIDENT</h1>
      <Link to="/foodqr" id="HomeFood_QR">
        FoodQR
      </Link>
      <a href="#" id="HomeCompalints">
        Complaints
      </a>
      <Link to="/residentprofile" id="HomeProfile">
        Profile
      </Link>
      <Link to="/" id="Homelogout">
        Logout
      </Link>
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
      <HomeNavBar />
      <NavItems />
      <MealSelect />
    </div>
  );
}

export default HomePage;
