import React, { Component } from "react";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TickerList extends Component{
    constructor(props) {
        super(props);
        this.state = {tickers : []};
        
    }
    
    componentWillMount() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
          }
        
        console.log(headers)

        axios.get("http://localhost:8080/tickerList",
        { headers: headers }).then(res => {
            let data = res.data[0].split(",")
            const tickers = data.map((ticker,index) =>
            
            <Dropdown.Item href={"/tickers/"+ticker} key={index}  >{ticker}</Dropdown.Item>
            );
            this.setState({tickers: tickers});
          });
    }
    
    render(){
        return (
                <div>
                    <h1>Choose a stock to predict</h1>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Stock tickers
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.tickers}
                        </Dropdown.Menu>
                    </Dropdown>
                    
                </div>
        )
    }
}
