import React, { useState, useEffect, useMemo } from "react";
import "./MealSelection.css";
import menuData from "./menuData";
import { Link } from "react-router-dom";

function NavbarBG() {
  return <div id="navbarbg"></div>;
}

function NavbarItems2() {
  return (
    <div id="NI2">
      <h1 id="hr">HOSTEL RESIDENT</h1>
      <Link to="/resident_home" id="h">
        Home
      </Link>
      <Link to="/foodqr" id="fqr">
        Food QR
      </Link>
      <a href="#" id="com">
        Complaints
      </a>
      <Link to="/residentprofile" id="pro">
        Profile
      </Link>
      <Link to="/" id="log">
        Logout
      </Link>
    </div>
  );
}

function MealHeading() {
  return (
    <div>
      <img src="/FoodIcons/1.png" id="logo1" alt="Logo" />
      <h1 id="MealGrad">Meal Selection</h1>
    </div>
  );
}

function WeekButtons({ setDay, disabledDays, bookedDays }) {
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
    <div id="weekbtns">
      {days.map((day) => (
        <button
          key={day}
          id={day.toLowerCase().slice(0, 3)}
          onClick={() => setDay(day)}
          style={{
            filter:
              disabledDays.includes(day) || bookedDays.includes(day)
                ? "grayscale(100%)"
                : "none",
            color: bookedDays.includes(day) ? "#888" : "#000", // Grayscale color
          }}
          disabled={disabledDays.includes(day) || bookedDays.includes(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
}

function MealSelectionPane({ day, isPast }) {
  const menu = menuData[day];

  return (
    <div id="mspBG" style={{ filter: isPast ? "grayscale(100%)" : "none" }}>
      <div id="Breakfast">
        <p id="bfhead">Breakfast</p>
        <img
          className="meal-img"
          id="bfPhoto"
          src={menu.breakfast.img}
          alt={menu.breakfast.name}
        />
        <p id="bf_food_name">{menu.breakfast.name}</p>
      </div>
      <div id="Lunch">
        <p id="luhead">Lunch</p>
        <img
          className="meal-img"
          id="luPhoto"
          src={menu.lunch.img}
          alt={menu.lunch.name}
        />
        <p id="lu_food_name">{menu.lunch.name}</p>
      </div>
      <div id="Dinner">
        <p id="dinnhead">Dinner</p>
        <img
          className="meal-img"
          id="dinPhoto"
          src={menu.dinner.img}
          alt={menu.dinner.name}
        />
        <p id="din_food_name">{menu.dinner.name}</p>
      </div>
    </div>
  );
}

function FinalSubmitBtn({ disabled, onSubmit }) {
  return (
    <div>
      <button
        id="Skipbtn"
        disabled={disabled}
        onClick={() => onSubmit("No food selected")}
      >
        Skip
      </button>
      <button
        id="FinalSubmitbtn"
        disabled={disabled}
        onClick={() => onSubmit("Yes I will Eat")}
      >
        Yes I will Eat
      </button>
      <p id="Submit_Text">
        Final submission Button. Once Submitted it’s Final.
        <br /> No Changes will be entertained
      </p>
    </div>
  );
}

function MealSelectionPage() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [disabledDays, setDisabledDays] = useState([]);
  const [mealSelections, setMealSelections] = useState({});
  const [bookedDays, setBookedDays] = useState([]);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  useEffect(() => {
    const today = new Date();
    const currentDay = today.toLocaleDateString("en-US", { weekday: "long" });
    // const currentDay = "Sunday";

    // Reset data on Sunday
    if (currentDay === "Sunday") {
      localStorage.removeItem("bookedDays");
      localStorage.removeItem("mealSelections");
      localStorage.removeItem("pastDays");
      setBookedDays([]);
      setMealSelections({});
    } else {
      const storedSelections =
        JSON.parse(localStorage.getItem("mealSelections")) || {};
      const storedBookedDays =
        JSON.parse(localStorage.getItem("bookedDays")) || [];

      setMealSelections(storedSelections);
      setBookedDays(storedBookedDays);

      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const currentDayIndex = daysOfWeek.indexOf(currentDay);
      const pastDays = daysOfWeek.slice(0, currentDayIndex + 1); // Include today in disabledDays

      setDisabledDays(pastDays);
    }
  }, []);

  const handleMealSelection = async (message) => {
    const userId = localStorage.getItem("userId");
    const residentname = localStorage.getItem("residentname");
    const residentID = localStorage.getItem("residentId");

    if (!userId || !residentname) {
      console.error(
        "User ID or Resident Name not found. Ensure the user is logged in."
      );
      alert("Please log in again.");
      return;
    }

    const confirmMessage = `Are you sure you want to ${message}?`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setButtonsDisabled(true);

    const selectedMeals = {
      residentname,
      residentId: residentID,
      selectedDay,
      selection: message,
      breakfastDish: menuData[selectedDay].breakfast.name,
      lunchDish: menuData[selectedDay].lunch.name,
      dinnerDish: menuData[selectedDay].dinner.name,
      date: new Date().toISOString(),
    };

    console.log("Submitting Meal Selection:", selectedMeals);

    try {
      const response = await fetch(
        "http://localhost:5000/api/save-meal-selection",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedMeals),
        }
      );

      if (response.ok) {
        console.log("Meal selection saved successfully!");
        alert("Your meal selection has been saved.");

        const incrementResponse = await fetch(
          "http://localhost:5000/api/increment-count",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              day: selectedDay,
              meal: message === "Yes I will Eat" ? "all" : "none", // Adjust according to meal type if needed
            }),
          }
        );

        if (!incrementResponse.ok) {
          console.error("Failed to increment meal count.");
          alert("There was an error updating the meal count.");
        }

        setMealSelections((prev) => {
          const updatedSelections = { ...prev, [selectedDay]: selectedMeals };
          localStorage.setItem(
            "mealSelections",
            JSON.stringify(updatedSelections)
          );
          return updatedSelections;
        });

        setBookedDays((prev) => {
          const updatedBookedDays = [...prev, selectedDay];
          localStorage.setItem("bookedDays", JSON.stringify(updatedBookedDays));
          return updatedBookedDays;
        });

        setButtonsDisabled(false);
      } else {
        console.error("Failed to save meal selection.");
        alert("There was an error saving your selection. Please try again.");
        setButtonsDisabled(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while submitting your selection. Please try again."
      );
      setButtonsDisabled(false);
    }
  };

  const isPastDay = disabledDays.includes(selectedDay);
  const changeDayWithAnimation = (day) => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setSelectedDay(day);
      setFadeClass("fade-in");
    }, 500);
  };

  const memoizedMealSelectionPane = useMemo(() => {
    return <MealSelectionPane day={selectedDay} isPast={isPastDay} />;
  }, [selectedDay, isPastDay]);

  return (
    <div id="MealPagecontainer">
      <NavbarBG />
      <NavbarItems2 />
      <MealHeading />
      <WeekButtons
        setDay={changeDayWithAnimation}
        disabledDays={disabledDays}
        bookedDays={bookedDays}
      />
      {memoizedMealSelectionPane}
      <FinalSubmitBtn
        disabled={isPastDay || buttonsDisabled}
        onSubmit={handleMealSelection}
      />
    </div>
  );
}

export default MealSelectionPage;
