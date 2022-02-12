import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./GroupInfo.module.css";

class TestInfo extends Component {
  render() {
    let tests = <h1 className="my-cl3">Loading...</h1>;
    if (this.props.data !== null) {
      if (this.props.data.length !== 0) {
        tests = this.props.data.map((item, index) => {
          return (
            <Link
              key={"Topbidsbox11" + index}
              className={classes.Topbidsbox}
              to={{
                pathname: `/show-test/${item.testid}`,
              }}
            >
              <div className={classes.Pointer1}>
                {" "}
                <strong> {item.name}</strong>{" "}
              </div>
              <p className={classes.Pointer2}>
                Description: {item.description}
              </p>
            </Link>
          );
        });
      } else {
        tests = <h1 className="my-cl3">Nothing to Show!</h1>;
      }
    }

    return (
      <>
        <div className={classes.Bids}>{tests}</div>
      </>
    );
  }
}
export default TestInfo;
