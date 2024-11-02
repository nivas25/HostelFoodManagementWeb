import React, { useState, useEffect } from "react";
import "./ResProfile.css";
import { Link } from "react-router-dom";
import axios from "axios";

function NavbarBG() {
  return <div id="navbarbg"></div>;
}

function NavbarItems2() {
  return (
    <div id="NI2">
      <h1 id="prohr">HOSTEL RESIDENT</h1>
      <Link to="/resident_home" id="proh">
        Home
      </Link>
      <Link to="/foodqr" id="fqr">
        Food QR
      </Link>
      <a href="#" id="com">
        Complaints
      </a>
      <Link to="/meal-selection" id="mealselection">
        Meal Selection
      </Link>
      <Link to="/" id="log">
        Logout
      </Link>
    </div>
  );
}

function ProfileHeading() {
  return <h1 id="ProfileGrad">Profile</h1>;
}

function ProfileBoxBG({ residentData }) {
  return (
    <div id="ProfileBoxBg">
      <div id="ProfilePhotoWrapper">
        <img
          id="ProfilePhoto"
          src="/FoodIcons/Profile.jpg"
          alt="Profile Photo"
        />
      </div>
      <div id="ProfileDetails">
        <p id="ResidentName">Name: {residentData.residentName}</p>
        <p id="ResidentEmailID">Email ID: {residentData.email}</p>
        <p id="ResidentID">Resident ID: {residentData.residentId}</p>
        <p id="Address">Address: {residentData.address}</p>
      </div>
    </div>
  );
}

function BookingsHeading() {
  return <h1 id="BookingsHeading">Your Bookings</h1>;
}

function WeekButtonsInProfile({ onSelectDay }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div id="BtnsBGProfileWrapper">
      <div id="BtnsBGProfile">
        {days.map((day) => (
          <button key={day} onClick={() => onSelectDay(day)}>
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

function BookingsDetailsInProfile({ selectedMealData }) {
  if (!selectedMealData) return <div>Select a day to view details</div>;

  return (
    <div id="BookingDetailsBGWrapper">
      <div id="BookingDetailsBG">
        <div id="breakfastProfile">
          <p id="breakHead">Breakfast</p>
          <p id="breakfastDetails">{selectedMealData.breakfastDish || "N/A"}</p>
        </div>
        <div id="lunchProfile">
          <p id="lunchHead">Lunch</p>
          <p id="lunchDetails">{selectedMealData.lunchDish || "N/A"}</p>
        </div>
        <div id="DinnerProfile">
          <p id="dinnerHead">Dinner</p>
          <p id="dinnerDetails">{selectedMealData.dinnerDish || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

function ResProfile() {
  const [residentData, setResidentData] = useState({});
  const [mealSelections, setMealSelections] = useState([]);
  const [selectedMealData, setSelectedMealData] = useState(null);

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        // Assuming your backend endpoint returns both resident and meal selections
        const response = await axios.get(
          "http://localhost:5000/api/profileMealSelection"
        );
        setResidentData(response.data.resident); // Adjust based on your API response
        setMealSelections(response.data.mealSelections); // Ensure this aligns with your API
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchResidentData();
  }, []);

  const handleSelectDay = (day) => {
    const selectedMeal = mealSelections.find((meal) => meal.bookedDay === day);
    setSelectedMealData(selectedMeal || {});
  };

  return (
    <div id="resprocontainer">
      <NavbarBG />
      <NavbarItems2 />
      <ProfileHeading />
      <ProfileBoxBG residentData={residentData} />
      <BookingsHeading />
      <WeekButtonsInProfile onSelectDay={handleSelectDay} />
      <BookingsDetailsInProfile selectedMealData={selectedMealData} />
    </div>
  );
}

export default ResProfile;
