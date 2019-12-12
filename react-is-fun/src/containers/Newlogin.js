//import React, { Component } from "react";
import axios from "axios";

import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl  } from "react-bootstrap";
import "./Newlogin.css";
import {FormLabel} from 'react-bootstrap';

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
    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        }
      )
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
                <FormLabel>Email</FormLabel>
                <FormControl
                    autoFocus
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
                <FormLabel>Password</FormLabel>
                <FormControl
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
            />
            </FormGroup>

          <button  bsSize="large" type="submit">Login</button>
        </form>
      </div>
    );
  }
}