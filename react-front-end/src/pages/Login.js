import React, { useState } from "react";
import axios from "axios";
import "../styles/auth/backgroundAnimation.css";
import '../styles/auth/auth.css'
import Circles from '../components/circles'

export default function Login() {
  const [values, setValues] = useState({
    Email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  // Redirection Function
  const goToSignUp = (e) => {
    e.preventDefault();
    console.log("Hello");
    window.location.href = "/SignUp";
  };

  // Inputs Handle
  const handleEmailInput = (event) => {
    setValues({ ...values, Email: event.target.value });
  };
  const handlePasswordInput = (event) => {
    setValues({ ...values, Password: event.target.value });
  };

  // Submits Handle
  const handleSubmit = async (event) => {
    event.preventDefault();
    let email = values.Email;
    let password = values.Password;
    return axios
      .post("localhost:3000/api/user/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          let user = [];
          user.push(
            response.data.username,
            response.data.user_id,
            response.data.is_admin
          );
          localStorage.setItem("user", user);
          console.log("Logged In");

          // Admin/User Switch
          if (response.data.is_admin === 1) {
            window.location.href = "/Admin/CreateSurvey";
          } else if (response.data.is_admin === 0) {
            window.location.href = "/SurveysList";
          }
          setValues({ Password: "", Email: "" });
          setValid(true);
        }
      });
  };


  return (
    <>
      <div className="Page logIn">
    <Circles />
        <form className="Form Auth logInPage">
          <h2>Sign In</h2>
          <p>Welcome Back</p>
          {valid ? (
              <div className="success-message">
              Success! Thank you for registering
            </div>
          ) : null}
          <input
            onChange={handleEmailInput}
            value={values.Email}
            className="form-field"
            placeholder="Email"
            name="Email"
          />
          {submitted && !values.Email ? (
            <span>Please enter an Email</span>
          ) : null}
          <input
            type={"password"}
            onChange={(event) => {
              setValues({ ...values, Password: event.target.value });
            }}
            value={values.Password}
            className="form-field"
            placeholder="Password"
            name="Password"
          />
          {submitted && !values.Password ? (
            <span>Please enter an Password</span>
          ) : null}
          <button className="btn Primary" onClick={handleSubmit} type="submit">
            Login
          </button>
          <button className="btn secondary" onClick={goToSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
