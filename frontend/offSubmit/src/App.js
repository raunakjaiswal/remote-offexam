import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Body from "./pages/Body/Body";
import Login from "./pages/login/login";
import Sign from "./pages/login/signup";
import Group from "./pages/Group/Group";
import Creatgrp from "./pages/creatGroup/Creatgrp";
import CrtTest from "./pages/createTest/CrtTest";
import ShowGrp from "./pages/ShowGrp/ShowGrp";
import TestShow from "./pages/Test/TestShow";
import ShowTest from "./pages/ShowTest/ShowTest";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  let [usertoken, setUserToken] = useState(
    window.localStorage.getItem("usertoken")
  );

  console.log(usertoken);
  return (
    <Router>
      <div className="App">
        <Navbar isUser={!usertoken ? false : true} onSet={setUserToken} />

        {/* <h1>{one}</h1> */}

        <Switch>
          <Route exact path="/">
            <Body />
          </Route>
          {!usertoken ? (
            <>
              <Route path="/groups">
                <Login onSet={setUserToken} />
              </Route>
              <Route path="/tests">
                <Login onSet={setUserToken} />
              </Route>
              <Route path="/login">
                <Login onSet={setUserToken} />
              </Route>
              <Route path="/signup">
                <Sign />
              </Route>
            </>
          ) : (
            <>
              <Route path="/groups">
                <Group />
              </Route>
              <Route path="/tests">
                <TestShow />
              </Route>
              <Route path="/createGrp">
                <Creatgrp />
              </Route>
              <Route path="/createTest">
                <CrtTest />
              </Route>
              <Route path="/show-group/:id" component={ShowGrp} />

              <Route path="/show-test/:id" component={ShowTest} />
            </>
          )}

          <Redirect to="/"></Redirect>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

// "proxy": "https://nitp.herokuapp.com",
