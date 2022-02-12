import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./GroupInfo.module.css";

class GroupInfo extends Component {
  render() {
    let groups = <h1 className="my-cl3">Loading...</h1>;
    if (this.props.data !== null) {
      if (this.props.data.length !== 0) {
        groups = this.props.data.map((item, index) => {
          return (
            <Link
              key={"Topbidsbox" + index}
              className={classes.Topbidsbox}
              to={{
                pathname: `/show-group/${item.id}`,
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
        groups = <h1 className="my-cl3">Nothing to Show!</h1>;
      }
    }

    return (
      <>
        <div className={classes.Bids}>{groups}</div>
      </>
    );
  }
}
export default GroupInfo;
