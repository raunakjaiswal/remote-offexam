import React, { Component } from "react";
import classes from "./AddStudent.module.css";

class AddStudent extends Component {
  render() {
    return (
      <div className={classes.main}>
        <h1 className="my-cl4">ADD STUDENT</h1>
        <form className={classes.formlBody} id="myForm">
          <div className={classes.formex}>
            <label htmlFor="email">Student Name </label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              onChange={(event) => {
                this.props.stuinfo(event);
              }}
              placeholder="Name"
              autoComplete="off"
              //   value={stinfo.name}
              required
            />
          </div>
          <div className={classes.formex}>
            <label htmlFor="pswd">Mobile Number </label>
            <br />
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              onChange={(event) => {
                this.props.stuinfo(event);
              }}
              //   value={stinfo.mobile}
              autoComplete="off"
              placeholder="Enter Mobile Number"
              required
            />
          </div>
          <div className={classes.formex}>
            <label htmlFor="pswd">Roll Number </label>
            <br />
            <input
              type="text"
              name="rollnumber"
              id="rollnumber"
              onChange={(event) => {
                this.props.stuinfo(event);
              }}
              //   value={stinfo.rollno}
              autoComplete="off"
              placeholder="Enter Roll Number"
              required
            />
          </div>
          <div
            className={classes.button}
            onClick={(event) => {
              this.props.handleClick(event);
            }}
          >
            <input type="submit" value="ADD" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddStudent;
