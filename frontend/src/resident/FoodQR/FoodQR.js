import React, { useRef } from "react";
import "./FoodQR.css";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

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
      <Link to="/meal-selection" id="mealselect">
        Meal Selection
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

function FoodQRHeading() {
  return <h1 id="FoodQRGrad">Food QR</h1>;
}

function WeekButtonsQR({ setDay, disabledDays }) {
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

function QRDownload() {
  const qrRef = useRef();

  const downloadQR = () => {
    const qrCanvas = qrRef.current.querySelector("canvas");
    const qrURL = qrCanvas.toDataURL("image/png");

    // Create a link element to trigger download
    const downloadLink = document.createElement("a");
    downloadLink.href = qrURL;
    downloadLink.download = "QR_Code.png";
    downloadLink.click();
  };

  return (
    <div id="QRDownBG">
      <div id="ActualQR" ref={qrRef}>
        <QRCodeCanvas value="https://your-url-or-content-here.com" size={300} />
      </div>
      <button id="QRDownbtn" onClick={downloadQR}>
        Download
      </button>
    </div>
  );
}

function FoodQR() {
  return (
    <div id="container">
      <NavbarBG />
      <NavbarItems2 />
      <FoodQRHeading />
      <WeekButtonsQR />
      <QRDownload />
    </div>
  );
}
export default FoodQR;
