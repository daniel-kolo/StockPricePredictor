import React, { Component } from "react";
import axios from 'axios';

export default class App extends Component {
    constructor(props){
        super(props);

        this.state ={
            predictions : []
        }
    }

    componentWillMount(){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
          }

        const data = {
            "ticker": this.props.ticker
        }

        axios.post("http://localhost:8080/prediction",
        { headers: headers, data: data }).then(response => {
            console.log(response.data);
            this.setStateb({predictions: response.data})
            //this.props.handleLogin(response)
        }).catch(error => {
            console.log(error);
        });
        //event.preventDefault();
    }

    render(){
        if (this.props.predicted == true){
            return (
                <div>
                    <h1>{this.props.ticker}</h1>
                </div>
            )
        } else{
            return(
                <div>
                    <h1>PICK A PREDICTION FOOL</h1>
                </div>
            )
        }

    }

}