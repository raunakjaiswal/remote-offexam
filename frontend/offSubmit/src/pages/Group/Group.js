import React, { useState, useEffect } from "react";
import classes from "./Group.module.css";
import GroupInfo from "../GroupInfo";
import axios from "axios";

function Group() {
  const [group_data, setGroup_data] = useState(null);

  useEffect(() => {
    var config = {
      method: "get",
      url: "https://remote-offexam-backend.herokuapp.com/getgroup",
      headers: {
        Authorization: "Bearer" + window.localStorage.getItem("usertoken"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setGroup_data(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log(group_data);
  return (
    <div className={classes.top_body}>
      <h1 className="my-cl4">Groups</h1>
      <GroupInfo data={group_data} />
    </div>
  );
}

export default Group;
