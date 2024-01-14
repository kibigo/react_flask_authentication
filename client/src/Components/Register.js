import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const id = e.target.id;
    const value = e.target.value;

    setFormData({ ...formData, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const emptyField = Object.keys(formData).find(
      (key) => !formData[key].trim()
    );
    if (emptyField) {
      const message = `Please enter a valid ${emptyField}`;
      window.alert(message);
      return;
    }

    fetch("/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        alert(`Welcome ${data.lastname}`);
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Invalid");
      });
  }

  return (
    <div className="login-dialogue">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          id="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />
        
        <input 
            type="email"
            id="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
        />

        <input
            type="password"
            id="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
