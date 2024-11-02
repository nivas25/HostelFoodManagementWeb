import React, { useState, useEffect, useMemo } from "react";
import "./MealSelection.css";
import menuData from "./menuData";
import { Link } from "react-router-dom";

function NavbarBG() {
  return <div id="navbarbg"></div>;
}

function NavbarItems2() {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("residentname");
    localStorage.removeItem("residentId");
    window.location.href = "/";
  };

  return (
    <div id="NI2">
      <h1 id="mshr">HOSTEL RESIDENT</h1>
      <Link to="/resident_home" id="msh">
        Home
      </Link>
      <Link to="/foodqr" id="fqr">
        Food QR
      </Link>
      {/* <a href="#" id="com">
        Complaints
      </a> */}
      {/* <Link to="/residentprofile" id="pro">
        Profile
      </Link> */}
      <Link to="/" id="log" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
}

function MealHeading() {
  return (
    <div>
      <img src="/FoodIcons/4.png" id="logo1" alt="Logo" />
      <h1 id="MealGrad">Meal Selection</h1>
    </div>
  );
}

function WeekButtons({ setDay, disabledDays, bookedDays, isSkipSelected }) {
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
                ? "grayscale(70%)"
                : "none",
            backgroundColor: disabledDays.includes(day) ? "#ccc" : "#4CAF50",
            color: "#fff",
            transition: "background-color 0.3s ease, filter 0.3s ease",
            padding: "10px 15px",
            border: "none",

            cursor:
              disabledDays.includes(day) || bookedDays.includes(day)
                ? "not-allowed"
                : "pointer",
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
  const [isSkipSelected, setIsSkipSelected] = useState(false); // Track if "Skip" is selected

  useEffect(() => {
    const today = new Date();
    const currentDay = today.toLocaleDateString("en-US", { weekday: "long" });
    // const currentDay = "Sunday";
    const residentId = localStorage.getItem("residentId");

    // Fetch stored selections and booked days for the logged-in user
    const mealSelectionsKey = `mealSelections_${residentId}`;
    const storedSelections =
      JSON.parse(localStorage.getItem(mealSelectionsKey)) || {};
    const storedBookedDays =
      JSON.parse(localStorage.getItem(`bookedDays_${residentId}`)) || [];

    setMealSelections(storedSelections);
    setBookedDays(storedBookedDays);

    // Reset data on Sunday only if the user is switching accounts or if it is a new week
    if (currentDay === "Sunday") {
      localStorage.removeItem("bookedDays");
      localStorage.removeItem("mealSelections");
      localStorage.removeItem("pastDays");
      setBookedDays([]);
      setMealSelections({});
    } else {
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
      const pastDays = daysOfWeek.slice(0, currentDayIndex + 1);
      setDisabledDays(pastDays);
    }
  }, []);

  const handleMealSelection = async (message) => {
    const residentname = localStorage.getItem("residentname");
    const residentId = localStorage.getItem("residentId");

    if (!residentId || !residentname) {
      alert("Please log in again.");
      return;
    }

    const confirmMessage = `Are you sure you want to ${message}?`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setButtonsDisabled(true);

    const isEating = message === "Yes I will Eat";
    const selectedMeals = {
      residentname,
      residentId,
      selectedDay,
      selection: message,
      breakfastDish: isEating ? menuData[selectedDay].breakfast.name : null,
      lunchDish: isEating ? menuData[selectedDay].lunch.name : null,
      dinnerDish: isEating ? menuData[selectedDay].dinner.name : null,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/mealSelectionRoutes/save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedMeals),
        }
      );

      if (response.ok) {
        alert("Your meal selection has been saved.");
        const mealSelectionsKey = `mealSelections_${residentId}`;
        const updatedSelections = {
          ...mealSelections,
          [selectedDay]: selectedMeals,
        };
        localStorage.setItem(
          mealSelectionsKey,
          JSON.stringify(updatedSelections)
        );
        setMealSelections(updatedSelections);

        if (isEating) {
          const updatedBookedDays = [...bookedDays, selectedDay];
          localStorage.setItem(
            `bookedDays_${residentId}`,
            JSON.stringify(updatedBookedDays)
          );
          setBookedDays(updatedBookedDays);
        }

        await fetch("http://localhost:5000/api/mealSelectionRoutes/increment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            day: selectedDay,
            meal: isEating ? "all" : "none",
          }),
        });
      } else {
        alert("There was an error saving your selection. Please try again.");
      }
    } catch (error) {
      alert(
        "An error occurred while submitting your selection. Please try again."
      );
    } finally {
      setButtonsDisabled(false);
    }
  };

  const handleSkip = () => {
    setIsSkipSelected(true); // Set "Skip" state to true
    setMealSelections((prev) => ({
      ...prev,
      [selectedDay]: { selection: "No food selected" },
    }));
    setButtonsDisabled(true);
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
        isSkipSelected={isSkipSelected} // Pass the "Skip" state
      />
      <div className={fadeClass}>{memoizedMealSelectionPane}</div>
      <FinalSubmitBtn
        disabled={buttonsDisabled}
        onSubmit={isSkipSelected ? handleSkip : handleMealSelection}
      />
    </div>
  );
}

export default MealSelectionPage;
