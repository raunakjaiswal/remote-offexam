import React, { useState, useEffect } from "react";
import classes from "./ShowGrp.module.css";
import AddStudent from "../../components/AddStudent/AddStudent";
import axios from "axios";

function ShowGrp(props) {
  const [stinfo, setStinfo] = useState({
    name: null,
    phonenumber: null,
    rollnumber: null,
  });

  const [data, setData] = useState(null);
  const [del, setDel] = useState(0);
  const [adduser, setAdduser] = useState(0);

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://remote-offexam-backend.herokuapp.com/getgroup/${props.match.params.id}`,
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
  }, [props.match.params.id, del, adduser]);

  function handleClick(event) {
    event.preventDefault();
    console.log(stinfo);

    var data = JSON.stringify({
      name: stinfo.name,
      rollnumber: stinfo.rollnumber,
      phonenumber: parseInt(stinfo.phonenumber),
    });

    var config = {
      method: "post",
      url: `https://remote-offexam-backend.herokuapp.com/getgroup/adduser/${props.match.params.id}`,
      headers: {
        Authorization: "Bearer" + window.localStorage.getItem("usertoken"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setAdduser(!adduser);
        document.querySelector("form").reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function stuinfo(event) {
    let { name, value } = event.target;

    setStinfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function dltUsr(id) {
    var data = "";

    var config = {
      method: "post",
      url: `https://remote-offexam-backend.herokuapp.com/group/removeuser/${props.match.params.id}/${id}`,
      headers: {
        Authorization: "Bearer" + window.localStorage.getItem("usertoken"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setDel(!del);
        document.querySelector("form").reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let body = <h1 className="my-cl3">Loading...</h1>;
  if (data) {
    let Table = data.studentlist.map((val, key) => {
      if (key % 2 === 1) {
        return (
          <tr key={key} className={classes.td1}>
            <td className={classes.td}>{val.name}</td>
            <td className={classes.td}>{val.phonenumber}</td>
            <td className={classes.td}>{val.rollnumber}</td>
            <td className={classes.td}>
              <span className={classes.span}>
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => dltUsr(val._id)}
                ></i>
              </span>
            </td>
            <td className={classes.td}></td>
          </tr>
        );
      } else {
        return (
          <tr key={key} className={classes.td2}>
            <td className={classes.td}>{val.name}</td>
            <td className={classes.td}>{val.phonenumber}</td>
            <td className={classes.td}>{val.rollnumber}</td>
            <td className={classes.td}>
              <span className={classes.span}>
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => dltUsr(val._id)}
                ></i>
              </span>
            </td>
          </tr>
        );
      }
    });

    body = (
      <>
        <div className={classes.showtable}>
          <table className={classes.table}>
            <tr className={classes.tr}>
              <th className={classes.th}>Name</th>
              <th className={classes.th}>Mobile No.</th>
              <th className={classes.th}>Roll No.</th>
              <th className={classes.th}></th>
            </tr>
            {Table}
          </table>
        </div>
        <div className={classes.addinfo}>
          <div className={classes.fixed}>
            <AddStudent stuinfo={stuinfo} handleClick={handleClick} />
          </div>
        </div>
      </>
    );
  }

  return <div className={classes.mainbody}>{body}</div>;
}

export default ShowGrp;
