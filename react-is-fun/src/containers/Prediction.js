import React, { Component } from "react";
import axios from 'axios';
import "./Prediction.css"

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
            this.setState({predictions: response.data})
            
        }).catch(error => {
            console.log(error);
        });
        //event.preventDefault();
    }

    SimpleList = () => (
        <div><h1>The predictions for the following 5 days:</h1>
        <ul style={{"list-style": "none"}}>
          {this.state.predictions.map(function(item) {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        </div>
      );

    render(){

        console.log(this.state.predictions)
        if (this.props.predicted == true){
            return (
                
                this.SimpleList()
            )
        } else{
            return(
                <div>
                    <h1>PICK A PREDICTION</h1>
                </div>
            )
        }

    }

}