import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Spinner } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  let loading = false;
  const PATH = "http://localhost:5000/api/auth";

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${PATH}/register`, {
        firstname,
        lastname,
        email,
        password,
      })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          navigate("/waiting");
        }
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  };

  return (
    <div className="page">
      <div className="title">SKILLOPEDIA</div>
      <div className="welcome">
        <div>Welcome!</div>
        <div>Create your account now!</div>
      </div>
      <div className="card" style={{ bottom: "-105vh !important" }}>
        <form
          onSubmit={(e) => {
            HandleSubmit(e);
          }}
        >
          <h2>Create Account</h2>

          <span className="pass">Firstname</span>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <span className="pass">Lastname</span>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />

          <span>Username</span>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Email Address"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <span className="pass">Password</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <div className="checks">
            {password.length >= 8 ? (
              <h6 style={{ color: "green" }}>- Atleast 8 characters </h6>
            ) : (
              <h6>- Atleast 8 characters </h6>
            )}
            {password.match(/(?=.*[A-Z])/) ? (
              <h6 style={{ color: "green" }}>- Atleast 1 capital</h6>
            ) : (
              <h6>- Atleast 1 capital</h6>
            )}
            {password.match(/.*[0-9].*/) ? (
              <h6 style={{ color: "green" }}>- Atleast 1 number</h6>
            ) : (
              <h6>- Atleast 1 number</h6>
            )}
          </div>

          {/* <button type="submit">SIGN UP</button> */}
          <button type="submit" id="Register">
            {loading ? <Spinner /> : <>REGISTER</>}
          </button>
          {/* TODO: CHANGE LOGIN => LINK TO*/}
        </form>
        <h4 className="Login">
          Already have an account?
          <Link to="/login">
            {" "}
            <b>Login</b>{" "}
          </Link>
        </h4>
      </div>
    </div>
  );
}
