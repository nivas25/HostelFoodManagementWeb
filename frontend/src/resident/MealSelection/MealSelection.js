import React, { useState, useEffect, useMemo } from "react";
import "./MealSelection.css";
import menuData from "./menuData";

function NavbarBG() {
  return <div id="navbarbg"></div>;
}

function NavbarItems2() {
  return (
    <div id="NI2">
      <h1 id="hr">HOSTEL RESIDENT</h1>
      <a href="#" id="h">
        Home
      </a>
      <a href="#" id="fqr">
        Food QR
      </a>
      <a href="#" id="com">
        Complaints
      </a>
      <a href="#" id="pro">
        Profile
      </a>
      <a href="#" id="log">
        Logout
      </a>
    </div>
  );
}

function MealHeading() {
  return <h1 id="MealGrad">Meal Selection</h1>;
}

function WeekButtons({ setDay, disabledDays }) {
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
            filter: disabledDays.includes(day) ? "grayscale(100%)" : "none",
          }}
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
        <div>
          <img
            className="meal-img"
            id="bfPhoto"
            src={menu.breakfast.img}
            alt={menu.breakfast.name}
          />
        </div>
        <p id="bf_food_name">{menu.breakfast.name}</p>
      </div>

      <div id="Lunch">
        <p id="luhead">Lunch</p>
        <div>
          <img
            className="meal-img"
            id="luPhoto"
            src={menu.lunch.img}
            alt={menu.lunch.name}
          />
        </div>
        <p id="lu_food_name">{menu.lunch.name}</p>
      </div>

      <div id="Dinner">
        <p id="dinnhead">Dinner</p>
        <div>
          <img
            className="meal-img"
            id="dinPhoto"
            src={menu.dinner.img}
            alt={menu.dinner.name}
          />
        </div>
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
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const today = new Date();
    const currentDay = today.toLocaleDateString("en-US", { weekday: "long" });

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
    const pastDays = daysOfWeek.slice(0, currentDayIndex);

    setDisabledDays(pastDays);

    // Reset meal selections if today is Sunday
    if (currentDay === "Sunday") {
      setMealSelections({});
      localStorage.removeItem("mealSelections");
    } else {
      const storedSelections = localStorage.getItem("mealSelections");
      if (storedSelections) {
        setMealSelections(JSON.parse(storedSelections));
      }
    }
  }, []);

  useEffect(() => {
    const preloadImages = () => {
      Object.values(menuData).forEach((menu) => {
        const breakfastImg = new Image();
        breakfastImg.src = menu.breakfast.img;

        const lunchImg = new Image();
        lunchImg.src = menu.lunch.img;

        const dinnerImg = new Image();
        dinnerImg.src = menu.dinner.img;
      });
    };

    preloadImages();
  }, []);

  const handleMealSelection = (message) => {
    setMealSelections((prevSelections) => {
      const updatedSelections = { ...prevSelections, [selectedDay]: message };
      localStorage.setItem("mealSelections", JSON.stringify(updatedSelections));
      return updatedSelections;
    });
  };

  const isPastDay = disabledDays.includes(selectedDay);

  const changeDayWithAnimation = (day) => {
    setFadeClass("fade-out"); // Start fade out

    setTimeout(() => {
      setSelectedDay(day); // Change the day
      setFadeClass("fade-in"); // Start fade in
    }, 500); // Match this with the fade-out duration
  };

  const memoizedMealSelectionPane = useMemo(() => {
    return <MealSelectionPane day={selectedDay} isPast={isPastDay} />;
  }, [selectedDay, isPastDay]);

  return (
    <div id="container">
      <NavbarBG />
      <NavbarItems2 />
      <MealHeading />
      <WeekButtons
        setDay={changeDayWithAnimation}
        disabledDays={disabledDays}
      />
      {memoizedMealSelectionPane}
      <FinalSubmitBtn disabled={isPastDay} onSubmit={handleMealSelection} />
    </div>
  );
}

export default MealSelectionPage;
