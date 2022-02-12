import React from "react";
import classes from "./Body.module.css";
import mainImage from "./img/1.png";
import { NavLink } from "react-router-dom";

function Body(props) {
  console.log(props.art);
  return (
    <div className={classes.mainBody}>
      <div className={classes.leftBody}>
        <div className={classes.lefttop}>
          <h1>Welcome to offExam</h1>
        </div>
        <div className={classes.middle}>
          <p>
            Students living in remote areas are experiencing difficulties
            getting question papers and submitting scanned answer pdfs due to
            internet issues So, we Remote Exam will help you to resolve this
            Problem.
          </p>
        </div>
        <div className={classes.leftbottom}>
          <NavLink to="/groups" className={classes.button10}>
            Group
          </NavLink>
          <NavLink to="/tests" className={classes.button10}>
            Test
          </NavLink>
        </div>
      </div>
      <div className={classes.rightBody}>
        <img className={classes.frontimg} src={mainImage} alt="fireSpot" />
      </div>
    </div>
  );
}

export default Body;
