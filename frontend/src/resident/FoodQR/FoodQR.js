import React, { useState, useRef, useEffect } from "react";
import "./FoodQR.css";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function NavbarBG() {
  return <div id="navbarbg"></div>;
}

function NavbarItems2() {
  return (
    <div id="NI2">
      <h1 id="fqrhr">HOSTEL RESIDENT</h1>
      <Link to="/resident_home" id="fqrh">
        Home
      </Link>
      <Link to="/meal-selection" id="mealselect">
        Meal Selection
      </Link>
      {/* <a href="#" id="com">
        Complaints
      </a> */}
      {/* <Link to="/residentprofile" id="pro">
        Profile
      </Link> */}
      <Link to="/" id="log">
        Logout
      </Link>
    </div>
  );
}

function FoodQRHeading() {
  return <h1 id="FoodQRGrad">Food QR</h1>;
}

function WeekButtonsQR({ setDay }) {
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
        >
          {day}
        </button>
      ))}
    </div>
  );
}

function QRDownload({ qrContent }) {
  const qrRef = useRef();

  const downloadQR = () => {
    const qrCanvas = qrRef.current.querySelector("canvas");
    const qrURL = qrCanvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = qrURL;
    downloadLink.download = "QR_Code.png";
    downloadLink.click();
  };

  return (
    <div id="QRDownBG">
      <div id="ActualQR" ref={qrRef}>
        {qrContent ? (
          <QRCodeCanvas value={qrContent} size={300} />
        ) : (
          <p>No meal selected yet</p>
        )}
      </div>
      {qrContent && (
        <button id="QRDownbtn" onClick={downloadQR}>
          Download
        </button>
      )}
    </div>
  );
}

function FoodQR() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [qrContent, setQrContent] = useState(null);
  const residentId = localStorage.getItem("residentId");
  const residentName = localStorage.getItem("residentname");

  useEffect(() => {
    // Fetch meal booking status for the selected day
    const mealSelectionsKey = `mealSelections_${residentId}`;
    const mealSelections =
      JSON.parse(localStorage.getItem(mealSelectionsKey)) || {};
    const selectedMeal = mealSelections[selectedDay];

    if (selectedMeal && selectedMeal.selection === "Yes I will Eat") {
      const today = new Date().toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
      const qrData = `${today}_${residentName}_${residentId}`;
      setQrContent(qrData);
    } else {
      setQrContent(null); // No QR if the meal isn’t booked
    }
  }, [selectedDay, residentId, residentName]);

  return (
    <div id="foodQRContainer">
      <NavbarBG />
      <NavbarItems2 />
      <FoodQRHeading />
      <WeekButtonsQR setDay={setSelectedDay} />
      <QRDownload qrContent={qrContent} />
    </div>
  );
}

export default FoodQR;
