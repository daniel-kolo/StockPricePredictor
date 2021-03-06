import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "./Login.css"

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post("http://localhost:8080/authenticate",
        { request: {
            email: this.state.email,
            password: this.state.password
          }}
        ).then(response => {
            //console.log(response.data.token);
            this.props.handleLogin(response)
            this.props.history.push("/predict");
        }).catch(error => {
            console.log(error);
        });
        event.preventDefault();

  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit" className="button">Login</button>
        </form>
      </div>
    );
  }
}