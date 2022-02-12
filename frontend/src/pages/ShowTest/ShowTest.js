import React, { useState, useEffect } from "react";
import classes from "./ShowTest.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

function ShowTest(props) {
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
        // JSON.stringify(response.data);
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
      var win = window.open();
      win.document.write(
        '<iframe src="' +
          data.encryptedquestionpaper +
          '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
      );
    }
  }

  let up = <h1 className="my-cl4">Loading...</h1>;
  if (data !== null) {
    up = (
      <div className={classes.up}>
        <div className={classes.upleft}>
          <h3>{data.name}</h3>
          <h6>
            <strong>Date : {data.date}</strong>
          </h6>
          <h6>
            <strong>Start Time : {data.starttime}</strong>
          </h6>
          <h6>
            <strong>End Time : {data.endtime}</strong>
          </h6>
          <h6>
            <strong>Password : {data.pdfpassword}</strong>
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
          <Link to="/verify-students" className={classes.button}>
            Verify Student
          </Link>
        </div>
      </div>
    );
  }

  let down = <h1 className="my-cl4">Loading...</h1>;
  if (data !== null) {
    if (data.answersubmit.length !== 0) {
      down = (
        <div className={classes.bottom}>
          <div className={classes.bottomleft}>
            <div className={classes.showtable}>
              <table className={classes.table}>
                <thead>
                  <tr className={classes.tr}>
                    <th className={classes.th}>Roll No.</th>
                    <th className={classes.th}>SSH Key</th>
                    <th className={classes.th}>Time</th>
                  </tr>
                </thead>
                {data.shakeysubmit.map((val, key) => {
                  return (
                    <tbody key={key}>
                      <tr className={classes.tr}>
                        <td className={key % 2 ? classes.td2 : classes.td1}>
                          {val.rollnumber}
                        </td>
                        <td className={key % 2 ? classes.td2 : classes.td1}>
                          {val.key}
                        </td>
                        <td className={key % 2 ? classes.td2 : classes.td1}>
                          {val.submissiontime}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          <div className={classes.bottomright}>
            <div className={classes.showtable}>
              <table className={classes.table}>
                <thead>
                  <tr className={classes.tr}>
                    <th className={classes.th}>Roll No.</th>
                    <th className={classes.th}>PDF</th>
                    <th className={classes.th}>Time</th>
                  </tr>
                </thead>
                {data.answersubmit.map((val, key) => {
                  return (
                    <tbody>
                      <tr className={classes.tr} key={key}>
                        <td className={key % 2 ? classes.td2 : classes.td1}>
                          {val.rollnumber}
                        </td>
                        <td className={key % 2 ? classes.td2 : classes.td1}>
                          <span className={classes.span}>
                            <i
                              className="fas fa-file-pdf"
                              onClick={() => {
                                window.open(val.anssheet);
                              }}
                            ></i>
                          </span>
                        </td>
                        <td className={key % 2 ? classes.td2 : classes.td1}>
                          {val.submissiontime}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      down = null;
    }
  }
  return (
    <div className={classes.main}>
      {up}
      {down}
    </div>
  );
}

export default ShowTest;
