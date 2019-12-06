import React from 'react'
import ReactDOM from 'react-dom'
import Login from "./containers/Login";

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

ReactDOM.render(
//<Message color="blue" msg="How are you?" minutes={5} />,
<Login/>,
    document.getElementById('root')
)