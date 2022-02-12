import React, { useState, useEffect } from "react";
import classes from "./ShowTest.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ShowTest(props) {
  let history = useHistory();
  const [data, setData] = useState(null);

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://remote-offexam-backend.herokuapp.com/gettestdata/${props.match.params.id}`,
      headers: {
        Authorization: "Bearer" + window.localStorage.getItem("usertoken"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.match.params.id]);

  function sendPass() {
    // history.push();
  }

  function sendOri() {
    if (data !== null) {
      window.open(data.orginialquestionpaper);
    }
  }

  function sendEn() {
    if (data !== null) {
      // window.open(data.encryptedquestionpaper);

      var win = window.open();
      win.document.write(
        '<iframe src="' +
          data.encryptedquestionpaper +
          '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
      );
    }
  }

  const data1 = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
  ];

  let up = <h1>Loading...</h1>;
  if (data !== null) {
    up = (
      <div className={classes.up}>
        <div className={classes.upleft}>
          <h3>{data.name}</h3>
          <h6>
            <strong>Date : {data.date}</strong>
          </h6>
          <h6>
            <strong>Start Time: {data.starttime}</strong>
          </h6>
          <h6>
            <strong>End Time: {data.endtime}</strong>
          </h6>
          <p>Description : {data.description}</p>
        </div>
        <div className={classes.upright}>
          <button className={classes.button} onClick={sendPass}>
            Send Password
          </button>
          <button className={classes.button} onClick={sendOri}>
            Original File
          </button>
          <button className={classes.button} onClick={sendEn}>
            Encrypted File
          </button>
          <button className={classes.button}>Verify Student</button>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.main}>
      {up}
      <div className={classes.bottom}>
        <div className={classes.bottomleft}>
          <div className={classes.showtable}>
            <table className={classes.table}>
              <tr className={classes.tr}>
                <th className={classes.th}>Roll No.</th>
                <th className={classes.th}>SSH Key</th>
                <th className={classes.th}>Time</th>
              </tr>
              {data1.map((val, key) => {
                return (
                  <tr className={classes.tr} key={key}>
                    <td>{val.name}</td>
                    <td>{val.age}</td>
                    <td>{val.gender}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <div className={classes.bottomright}>
          <div className={classes.showtable}>
            <table className={classes.table}>
              <tr className={classes.tr}>
                <th className={classes.th}>Roll No.</th>
                <th className={classes.th}>PDF</th>
                <th className={classes.th}>Time</th>
              </tr>
              {data1.map((val, key) => {
                return (
                  <tr className={classes.tr} key={key}>
                    <td className={classes.td1}>{val.name}</td>
                    <td className={classes.td1}>{val.age}</td>
                    <td className={classes.td1}>{val.gender}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowTest;
