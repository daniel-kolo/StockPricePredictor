import React from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'


export default class TickerList extends React.Component{
    constructor() {
        super();
        this.state = {tickers : []};
        
    }
    
    componentWillMount() {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc2RAYXNkLmNvbSIsImV4cCI6MTU3NjA5NTc2OSwiaWF0IjoxNTc2MDc3NzY5fQ.aqZQPP7sibkGuCfYTwAmZxBocrJk8PaFYMqGXuSPHvOsrs9VLVd_I1blFFTvQh3OzdY-GuYAG6fyNA9-gc6vmA'
          }

        axios.get("http://localhost:8080/tickerList",
        { headers: headers }).then(res => {
            let data = res.data[0].split(",")
            const tickers = data.map((ticker,index) =>
            <Dropdown.Item href={ticker} key={index}  >{ticker}</Dropdown.Item>
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
