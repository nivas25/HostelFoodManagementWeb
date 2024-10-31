import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  return (
    <div className="loginPageContainer">
      <Heading />
      <LoginBox />
      <FoodPhotos />
    </div>
  );
}

function Heading() {
  return (
    <div id="heading">
      <p>
        Hostel
        <br />
        <p id="foodManagement">Food Management System</p>
      </p>
    </div>
  );
}

function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !userType) {
      setErrorMessage("Please fill in all fields and select a user type.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
        userType,
      });

      if (response.status === 200) {
        console.log("Login successful");
        console.log("Full response data:", response.data);

        const residentId = response.data.residentID; // Store the user ID in local storage
        localStorage.setItem("residentId", residentId);
        console.log("resident ID stored:", residentId);

        // Store resident name only if the user type is "hostel_resident"
        if (userType === "hostel_resident") {
          localStorage.setItem("residentname", response.data.residentname);
          console.log("Resident name stored:", response.data.residentname);
        }

        // Redirect based on user type
        switch (userType) {
          case "hostel_resident":
            navigate("/resident_home");
            break;
          case "warden":
            navigate("/wardenHome");
            break;
          case "kitchen_department":
            navigate("/kitchenHome");
            break;
          case "admin":
            navigate("/adminHome");
            break;
          default:
            setErrorMessage("Invalid user type selected.");
        }
      }
    } catch (error) {
      console.error("Login error:", error); // Log error for debugging
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div id="loginContainer">
      <div id="welcome">
        <p id="Welcome_Back">Welcome Back</p>
        <p id="Enter_name">
          Enter your username and password to access your account
        </p>
      </div>
      <form id="loginDetails" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="email"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Select User Type</option>
          <option value="hostel_resident">Hostel Resident</option>
          <option value="warden">Warden</option>
          <option value="kitchen_department">Kitchen Department</option>
          <option value="admin">Admin</option>
        </select>
        <br />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" id="login_btn">
          Submit
        </button>
      </form>
    </div>
  );
}

function FoodPhotos() {
  return (
    <div id="login_page_Photos_Container">
      <div id="buildings">
        <div id="building"></div>
        <div id="Old_built"></div>
      </div>
      <div id="Food"></div>
    </div>
  );
}

export default LoginPage;
