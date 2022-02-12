import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Sign() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [mbl, setMbl] = useState("");

  function handleClick(event) {
    event.preventDefault();
    // alert("Signed Up.");
    const userDetail = {
      name: userName,
      email: email,
      password: pswd,
      phonenumber: mbl,
    };

    var config = {
      method: "post",
      url: "https://remote-offexam-backend.herokuapp.com/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: userDetail,
    };

    console.log(userDetail);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Registered");
      })
      .catch(function (error) {
        console.log(error);
      });

    setUserName("");
    setEmail("");
    setPswd("");
    setMbl("");
  }

  function Uname(event) {
    let t = event.target.value;
    setUserName(t);
    // console.log(userName);
  }

  function Email(event) {
    let t = event.target.value;
    setEmail(t);
    // console.log(email);
  }

  function Pswd(event) {
    let t = event.target.value;
    setPswd(t);
    // console.log(pswd);
  }

  function Mnumber(event) {
    let t = event.target.value;
    setMbl(t);
    // console.log(repswd);
  }

  return (
    <div className="loginBody">
      <h1 className="my-cl4">Sign Up</h1>
      <form onSubmit={handleClick} className="formlBody">
        <div className="form-ex">
          <label htmlFor="name" className="my-cl3">
            Enter your name{" "}
          </label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={Uname}
            placeholder="Your Name"
            value={userName}
            required
          />
        </div>
        <div className="form-ex">
          <label htmlFor="email" className="my-cl3">
            Enter your Email Id{" "}
          </label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={Email}
            placeholder="Your Email Id"
            value={email}
            required
          />
        </div>
        <div className="form-ex">
          <label htmlFor="pswd" className="my-cl3">
            Password{" "}
          </label>
          <br />
          <input
            type="password"
            name="pswd"
            id="pswd"
            onChange={Pswd}
            placeholder="Enter Password"
            value={pswd}
            required
          />
        </div>
        <div className="form-ex">
          <label htmlFor="rpswd" className="my-cl3">
            Enter Mobile Number{" "}
          </label>
          <br />
          <input
            type="mobile"
            name="mobile"
            id="mobile"
            onChange={Mnumber}
            placeholder="Enter Mobile Number"
            value={mbl}
            required
          />
        </div>
        <div className="log-button-flex">
          <div className="button-5">
            <input type="submit" value="Sign Up" />
          </div>
          <Link className="button-5" to="/Login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Sign;
