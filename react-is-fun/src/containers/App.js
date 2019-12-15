import React, { Component } from "react";
import axios from "axios";

import Login from "./Login"
import TickerList from "./tickerList.js"
import Registration from "./Registration"
import RouterElement from "./Router";
import { directive } from "@babel/types";

import Nav from "./Nav";
import {BrowserRouter as Router ,Link, Switch, Route} from 'react-router-dom'; 

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    //this.handleLogin = this.handleLogin.bind(this);
    //this.handleLogout = this.handleLogout.bind(this);
  }
   /*
  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  */

  render(){
    return(
      <Router>
        <div className = "App">
          <Nav/>
          <Switch>
            <Route path="/" exact component ={Registration}/>
            <Route path="/login" component ={Login}/>
            <Route path="/predict" component ={TickerList}/>
          </Switch>
        </div>
      </Router>
        
    );
  }

}