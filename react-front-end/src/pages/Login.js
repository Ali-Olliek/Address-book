import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth/backgroundAnimation.css";
import '../styles/auth/auth.css';
import Circles from '../components/Circles';


export default function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  // Redirection Function
  const goToSignUp = (e) => {
    e.preventDefault();
    window.location.href = "/SignUp";
  };

  // Inputs Handle
  const handleEmailInput = (event) => {
    setValues({ ...values, email: event.target.value });
  };
  const handlePasswordInput = (event) => {
    setValues({ ...values, Password: event.target.value });
  };

  // Submits Handle
  const handleSubmit = async (event) => {
    event.preventDefault();
    let email = values.email.toLowerCase();
    let password = values.Password;
    return axios
      .post("http://localhost:3000/api/user/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          let user = [];
          user.push(
            res.data.name,
            res.data._id,
            res.data.token
          );
          localStorage.setItem("user", user);
          window.location.href = "/Main"
          console.log("Logged In");
          setValues({ Password: "", email: "" });
          setValid(true);
        }
      });
  };


  return (
    <div className="Page logIn">
      <h1 className="title">Address Book</h1>
      <Circles />
      <form
        className="Form Auth logInPage"
      >
        <h2>Sign In</h2>
        <p>Welcome Back</p>
        {valid ? <div className="success-message">Success!</div> : null}
        <input
          onChange={handleEmailInput}
          value={values.email}
          className="form-field"
          placeholder="Email"
          name="Email"
        />
        {submitted && !values.Email ? <span>Please enter an Email</span> : null}
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
        <button className="btn Secondary" onClick={goToSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
