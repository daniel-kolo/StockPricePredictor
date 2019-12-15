import React, { Component } from "react";
import Login from "./Login"
import TickerList from "./tickerList.js"
import Registration from "./Registration"
import Nav from "./Nav";
import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom'; 
import Prediction from "./Prediction"

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      token: "",
      predicted: false,
      ticker: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

  }


  handleOnClick(ticker){
    this.setState({predicted: true, ticker: ticker});
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

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      token: data.data.token
    });

    console.log("logged in succesfully");
  }

  render(){
    return(
      <Router>
        <div className = "App">
          <Nav/>
          <Switch>
            <Route path="/" exact render= {props => (
                <Registration
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
                )}
            />
            <Route path="/login" render={props =>(
              <Login {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />
              )}
            />
            <Route path="/predict" render={props =>(
              <TickerList {...props}
                handleOnClick = {this.handleOnClick}
                loggedInStatus={this.state.loggedInStatus}
                token = {this.state.token}
              />
              )}
            />
            <Route path="/prediction" render={props =>(
              <Prediction {...props}
                predicted= {this.state.predicted}
                ticker = {this.state.ticker}
                token = {this.state.token}
              />
              )}
            />
          </Switch>
        </div>
      </Router>
        
    );
  }

}