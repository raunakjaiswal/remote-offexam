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
            Hey I am Raunak and I am the Sexiest boy at IIIT Vadodara. If You
            feel alone dial my toll free number at any time, Services are
            available 24*7. Call me now at 7762845211.
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
