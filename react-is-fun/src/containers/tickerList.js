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
        axios.get("http://localhost:8080/tickerList",
        { headers: {'Content-Type': 'application/json'}}).then(res => {
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
