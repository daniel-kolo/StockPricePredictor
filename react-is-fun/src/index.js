import React from 'react'
import ReactDOM from 'react-dom'
import Login from "./containers/Login";
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

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
        super()
    }
      componentWillMount() {
        this.getDataAxios()
    }

    async getDataAxios(){
        const response =
          await axios.get("http://localhost:8080/tickerList",
          { headers: {'Content-Type': 'application/json'}})
        console.log(response.data)
    }
    
    render(){
        return (
            <div>
                <p>Hello World</p>
                
            </div>
        )
    }
}

class Test extends React.Component{
    constructor() {
        super()
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
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
    <Test/>,
    document.getElementById('root')
)