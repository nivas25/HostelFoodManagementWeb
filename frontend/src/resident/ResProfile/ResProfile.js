import React, { useState, useEffect, useMemo } from "react";
import "./ResProfile.css";
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

function ProfileBoxBG() {
  return (
    <div id="ProfileBoxBg">
      <div id="ProfilePhotoWrapper">
        <img id="ProfilePhoto" src="path/to/photo.jpg" alt="Profile Photo" />
      </div>
      <div id="ProfileDetails">
        <p id="ResidentName">Name:</p>
        <p id="ResidentEmailID">Email ID:</p>
        <p id="Room No">Room No:</p>
        <p id="Resident ID">Resident ID:</p>
      </div>
    </div>
  );
}

function BookingsHeading() {
  return <h1 id="BookingsHeading">You're Bookings</h1>;
}

function WeekButtonsInProfile() {
  return (
    <div id="BtnsBGProfileWrapper">
      <div id="BtnsBGProfile">
        <button id="monpro">Monday</button>
        <button id="tuepro">Tuesday</button>
        <button id="wedpro">Wednesday</button>
        <button id="thurspro">Thursday</button>
        <button id="fripro">Friday</button>
        <button id="satpro">Saturday</button>
        <button id="sunpro">Sunday</button>
      </div>
    </div>
  );
}

function BookingsDetailsInProfile() {
  return (
    <div id="BookingDetailsBGWrapper">
      <div id="BookingDetailsBG">
        <div id="breakfastProfie">
          <p id="breakHead">Breakfast</p>
          <p id="breakfastDetails">Dosa</p>
        </div>
        <div id="lunchProfie">
          <p id="lunchHead">Lunch</p>
          <p id="lunchDetails">Chicken Curry</p>
        </div>
        <div id="DinnerProfile">
          <p id="dinnerHead">Dinner</p>
          <p id="dinnerDetails">Chicken Biryani</p>
        </div>
      </div>
    </div>
  );
}

function ResProfile() {
  return (
    <div id="container">
      <NavbarBG />
      <NavbarItems2 />
      <ProfileHeading />
      <ProfileBoxBG />
      <BookingsHeading />

      <WeekButtonsInProfile />

      <BookingsDetailsInProfile />
    </div>
  );
}

export default ResProfile;
