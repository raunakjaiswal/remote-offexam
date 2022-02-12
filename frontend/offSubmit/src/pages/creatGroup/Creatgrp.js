import React, { useState } from "react";
import classes from "./creatGroup.module.css";
import AddStudent from "../../components/AddStudent/AddStudent";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Creatgrp(props) {
  let history = useHistory();
  const [grpInfo, setGrpinfo] = useState({
    name: "",
    description: "",
    studentlist: [],
  });

  const [stinfo, setStinfo] = useState({
    name: "",
    phonenumber: "",
    rollnumber: "",
  });

  const [next, setNext] = useState(0);

  function Grpinfo(event) {
    let { name, value } = event.target;
    setGrpinfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function stuinfo(event) {
    let { name, value } = event.target;
    console.log({ value });
    setStinfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    console.log(grpInfo);
    event.preventDefault();
    var data = JSON.stringify({
      ...grpInfo,
    });

    console.log(data);

    var config = {
      method: "post",
      url: "https://remote-offexam-backend.herokuapp.com/creategroup",
      headers: {
        Authorization: "Bearer" + window.localStorage.getItem("usertoken"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        history.replace("/groups");
      })
      .catch(function (error) {
        console.log(error);
      });
    // document.getElementById("my-form1").reset();
  }

  function handleClick1(event) {
    event.preventDefault();
    setGrpinfo((prev) => {
      return {
        ...prev,
        studentlist: [...prev.studentlist, stinfo],
      };
    });

    setStinfo((prev) => {
      return {
        ...prev,
        name: "",
        phonenumber: "",
        rollnumber: "",
      };
    });

    document.getElementById("myForm").reset();
  }

  let page = (
    <div className="loginBody">
      <h1 className="my-cl4">CREATE GROUP</h1>
      <form onSubmit="" className={classes.formlBody} id="my-form1">
        <div className="form-ex">
          <label htmlFor="email">Enter Group Name </label>
          <br />
          <input
            type="text"
            name="name"
            id="grp_name"
            onChange={Grpinfo}
            placeholder="Enter Class Name"
            autoComplete="off"
            value={grpInfo.grp_name}
            required
          />
        </div>
        <div className="form-ex">
          <label htmlFor="email">Enter Group Description </label>
          <br />
          <input
            type="text"
            name="description"
            id="description"
            onChange={Grpinfo}
            placeholder="Enter Description"
            autoComplete="off"
            value={grpInfo.description}
            required
          />
        </div>
        <div className={classes.button} onClick={() => setNext(1)}>
          <input type="submit" value="Next" />
        </div>
      </form>
    </div>
  );

  if (next === 1) {
    page = (
      <div className={classes.loginBody}>
        <div className={classes.wC}>
          <AddStudent stuinfo={stuinfo} handleClick={handleClick1} />
        </div>
        <div className={classes.formlBody1}>
          <p style={{ color: "black" }}>
            NOTE: AFTER ADDING ALL STUDENTS YOU CAN CLICK ON CREATE GROUP.
          </p>
          <input
            type="submit"
            className={classes.button}
            onClick={handleClick}
            value="Create"
          ></input>
        </div>
      </div>
    );
  }

  return <div>{page}</div>;
}

export default Creatgrp;
