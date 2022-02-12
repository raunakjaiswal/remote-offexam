import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Login(props) {
  let history = useHistory();

  const [userinfo, setUserinfo] = useState({
    email: "",
    pswd: "",
  });

  function handleClick(event) {
    event.preventDefault();
    var data = JSON.stringify({
      email: userinfo.email,
      password: userinfo.pswd,
    });

    var config = {
      method: "post",
      url: "https://remote-offexam-backend.herokuapp.com/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        JSON.stringify(response.data);
        const { usertoken } = response.data;
        props.onSet(usertoken);
        window.localStorage.setItem("usertoken", usertoken);
        history.replace("/");
      })
      .catch(function (error) {
        alert("Enter Correct Email/Password.");
        console.log(error);
      });
  }

  function Uinfo(event) {
    let { name, value } = event.target;
    setUserinfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="loginBody">
      <h1 className="my-cl4">Login</h1>
      <form onSubmit={handleClick} className="formlBody">
        <div className="form-ex">
          <label htmlFor="email" className="my-cl3">
            Enter your Email Id{" "}
          </label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={Uinfo}
            placeholder="Your Email Id"
            autoComplete="off"
            value={userinfo.email}
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
            onChange={Uinfo}
            value={userinfo.pswd}
            autoComplete="off"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="log-button-flex">
          <div className="button-5">
            <input type="submit" value="Login" />
          </div>
          <Link className="button-5" to="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
