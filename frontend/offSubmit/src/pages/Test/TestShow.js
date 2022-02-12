import React, { useState, useEffect } from "react";
import classes from "./TestShow.module.css";
import TestInfo from "../Testinfo";
import axios from "axios";

function TestShow() {
  const [test_data, setTest_data] = useState(null);

  useEffect(() => {
    var config = {
      method: "get",
      url: "https://remote-offexam-backend.herokuapp.com/test",
      headers: {
        Authorization: "Bearer" + window.localStorage.getItem("usertoken"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setTest_data(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log(test_data);
  return (
    <div className={classes.top_body}>
      <h1 className="my-cl4">Tests</h1>
      <TestInfo data={test_data} />
    </div>
  );
}

export default TestShow;
