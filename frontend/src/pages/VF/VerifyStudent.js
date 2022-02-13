import React, { useState, useEffect } from "react";
import classes from "./Vf.module.css";
import axios from "axios";

function VerifySt(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://remote-offexam-backend.herokuapp.com/test/result/${props.match.params.id}`,
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

  let table = <h1 className="my-cl4">Loading...</h1>;
  if (data) {
    if (data.length !== 0) {
      table = (
        <div className={classes.showtable}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>R.No.</th>
                <th className={classes.th}>PDF</th>
                <th className={classes.th}>SHA key Verification</th>
                <th className={classes.th}>SHA key submission Time</th>
                <th className={classes.th}>SHA key submission Date</th>
                <th className={classes.th}>SHA Key recieve in Time</th>
                <th className={classes.th}>Paper key delivery Status</th>
                <th className={classes.th}>Paper Key delivery Message Time</th>
              </tr>
            </thead>
            {data.map((val, key) => {
              return (
                <tbody key={key}>
                  <tr className={classes.tr}>
                    <td className={key % 2 ? classes.td2 : classes.td1}>
                      {val.rollnumber}
                    </td>
                    <td className={key % 2 ? classes.td2 : classes.td1}>
                      <span className={classes.span}>
                        {val.answerlink.length > 1 ? (
                          <i
                            className="fas fa-file-pdf"
                            onClick={() => {
                              window.open(val.answerlink);
                            }}
                          ></i>
                        ) : (
                          "-"
                        )}
                      </span>
                    </td>
                    <td className={key % 2 ? classes.td2 : classes.td1}>
                      {typeof val.sha256true == "boolean"
                        ? val.sha256true
                          ? "True"
                          : "False"
                        : "-"}
                    </td>
                    <td className={key % 2 ? classes.td2 : classes.td1}>
                      {val.keysubmissiontime === "-"
                        ? "-"
                        : val.keysubmissiontime}
                    </td>
                    <td className={key % 2 ? classes.td2 : classes.td1}>
                      {val.keysubmissiondate === "-"
                        ? "-"
                        : val.keysubmissiondate}
                    </td>
                    <td className={key % 2 ? classes.td2 : classes.td1}>
                      {typeof val.submissiontime == "boolean"
                        ? val.submissiontime
                          ? "True"
                          : "False"
                        : "-"}
                    </td>
                    <td className={key % 2 ? classes.td2 : classes.td1}>
                      {val.status}
                    </td>
                    <td className={key % 2 ? classes.td2 : classes.td1}>
                      {new Date(val.messagetime).toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                        hour12: false,
                      })}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      );
    } else {
      table = <h1 className="my-cl4">Nothing to Show!</h1>;
    }
  }
  return <div className={classes.main}>{table}</div>;
}

export default VerifySt;
