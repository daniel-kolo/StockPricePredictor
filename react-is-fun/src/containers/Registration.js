import React , {Component} from "react";
import axios from "axios";


export default class Registration extends Component{
    constructor(props){
        super(props);

        this.state = {
            email : "",
            password: "",
            registrationErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        }); 
    }

    handleSubmit(event){
        axios.post("http://localhost:8080/register",
        { user: {
            email: this.state.email,
            password: this.state.password
          }}
        ).then(response => {
            console.log(response);
            this.props.history.push("/login");
        }).catch(error => {
            console.log(error);
        });
        event.preventDefault();
    }

    render(){
        return (<div>

            <form className="form" onSubmit={this.handleSubmit}>
                <input 
                    type="email" 
                    name = "email" 
                    placeholder = "Email" 
                    value = {this.state.email} 
                    onChange = {this.handleChange} 
                    required />

                <input 
                    type="password" 
                    name = "password" 
                    placeholder = "Password" 
                    value = {this.state.password} 
                    onChange = {this.handleChange} 
                    required />

                <button type="submit">Register</button> 
            </form>

            
        </div>);
    }


}