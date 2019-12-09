import React from 'react'
import ReactDOM from 'react-dom'
import Login from "./containers/Login"
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'
import { tsParenthesizedType } from '@babel/types'

class Message extends React.Component{
    render(){
        return (
            <div>
                <h1 style = {{color: this.props.color}}>
                {this.props.msg}
                </h1>
                <p>
                    I'll check back in {this.props.minutes} minutes
                </p>
            </div>
        )
    }
}


class TickerList extends React.Component{
    constructor() {
        super();
        this.state = {tickers : []};
        
    }
    
    componentWillMount() {
        axios.get("http://localhost:8080/tickerList",
        { headers: {'Content-Type': 'application/json'}}).then(res => {
            let data = res.data[0].split(",")
            const tickers = data.map((ticker,index) =>
            <Dropdown.Item key={index} >{ticker}</Dropdown.Item>
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
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.tickers}
                        </Dropdown.Menu>
                    </Dropdown>
                    
                </div>
        )
    }
}

class DropdownTest extends React.Component{
    constructor() {
        super()
        this.data = ['asd', 'asd2']
    }
    render(){
        return (
            <div>
                <p>Hello World</p>
                
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    {this.data.map(size => (
                        <Dropdown.Item>{size}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                
            </div>
        )               
    }
}





ReactDOM.render(
    //<Message color="blue" msg="How are you?" minutes={5} />,
    //<Login/>,
    //<TickerList/>,
    <TickerList/>,
    document.getElementById('root')
)