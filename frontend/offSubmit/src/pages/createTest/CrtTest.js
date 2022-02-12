import React, { useState, useEffect } from "react";
import axios from "axios";
import formData from "form-data";
import classes from "./CrtTest.module.css";
import { useHistory } from "react-router-dom";

function CrtTest() {
  let history = useHistory();
  const [inputitem, setInputitem] = useState({
    myPdf: null,
    name: "",
    description: "",
    date: null,
    time_st: null,
    time_en: null,
    group: null,
    password: null,
  });

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
        JSON.stringify(response.data);
        setGroup_data(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function SubmitItem(event) {
    // console.log(inputitem);
    event.preventDefault();
    const data = new formData();
    data.append("file", inputitem.myPdf);
    // data.append("file", fs.createReadStream("/C:/Users/parag/RESUME/css.pdf"));
    data.append("name", inputitem.name);
    data.append("description", inputitem.description);
    data.append("starttime", inputitem.time_st + ":00");
    data.append("endtime", inputitem.time_en + ":00");
    data.append("password", inputitem.password);
    // 2022 - 02 - 13;
    const formatDate =
      parseInt(inputitem.date.slice(8)) +
      "/" +
      parseInt(inputitem.date.slice(5, 7)) +
      "/" +
      inputitem.date.slice(0, 5);
    data.append("date", formatDate);
    data.append("group", inputitem.group);

    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    var config = {
      method: "post",
      url: "https://remote-offexam-backend.herokuapp.com/test",
      headers: {
        Authorization: "Bearer" + window.localStorage.getItem("usertoken"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        history.replace("/tests");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleClick(event) {
    console.log(event);
    const { name, value, files } = event.target;
    if (name === "myPdf") {
      setInputitem((prev) => {
        return {
          ...prev,
          [name]: files[0],
        };
      });
    } else {
      setInputitem((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  let option = <option value="">Loading...</option>;

  if (group_data) {
    option = group_data.map((item, index) => {
      return (
        <option style={{ color: "black" }} value={item.id}>
          {item.name}
        </option>
      );
    });
  }

  const slct = (
    <div className={classes.formex}>
      <label for="group-select">Choose Group</label>

      <select
        onChange={handleClick}
        className={classes.select}
        name="group"
        id="pet-select"
      >
        <option
          selected="true"
          disabled="disabled"
          value=""
          style={{ color: "black" }}
        >
          Please choose an Group
        </option>
        {option}
      </select>
    </div>
  );

  return (
    <div className={classes.createBody}>
      <h2 className="my-cl4">CREATE TEST</h2>
      <form onSubmit={SubmitItem} className="formlBody">
        <div className={classes.formex}>
          <label for="name">Test Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleClick}
            value={inputitem.name}
            required
            placeholder="Test Name"
          />
        </div>
        <br />
        <div className={classes.formex}>
          <label for="description">Description </label>
          <br />
          <textarea
            className={classes.decriptionbox}
            name="description"
            id=""
            rows="4"
            onChange={handleClick}
            value={inputitem.description}
            placeholder="Description of Your Item"
          ></textarea>
        </div>
        <br />
        {slct}
        <br />
        <div className={classes.formex}>
          <label for="price">Date </label>
          <br />
          <input
            type="date"
            name="date"
            id="date"
            onChange={handleClick}
            value={inputitem.date}
            required
          />
        </div>
        <div className={classes.formex}>
          <label for="price">Start Time </label>
          <br />
          <input
            type="time"
            name="time_st"
            id="time_st"
            onChange={handleClick}
            required
          />
        </div>
        <div className={classes.formex}>
          <label for="price">End Time </label>
          <br />
          <input
            type="time"
            name="time_en"
            id="time_en"
            onChange={handleClick}
            required
          />
        </div>
        <div className={classes.formex}>
          <label for="uploaded_file">Upload File </label>
          <br />
          <div className="input-group mb-3 ">
            <input
              type="file"
              className="form-control"
              style={{ border: "1px solid black" }}
              id="inputGroupFile02"
              name="myPdf"
              accept="image/*, .pdf, .doc"
              onChange={handleClick}
              required
            />
          </div>
        </div>
        <br />
        <div className={classes.formex}>
          <label for="password">Password</label>
          <br />
          <input
            type="text"
            name="password"
            id="password"
            onChange={handleClick}
            value={inputitem.password}
            required
            placeholder="Password"
          />
        </div>
        <div className={classes.formex1}>
          <input type="submit" value="CREATE TEST" />
        </div>
      </form>
    </div>
  );
}

export default CrtTest;
