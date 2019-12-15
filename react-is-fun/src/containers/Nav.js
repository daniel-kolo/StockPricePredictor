import React from "react";
import {Link } from "react-router-dom";
import "./App.css"

function Nav(){
    
    const navStyle={
        color:'black'
    };

    return(
    <nav >
        <ul className="nav-links" >
            <Link to="/">
                <li>Register</li>
            </Link>

            <Link style={navStyle} to="/login">
                <li>Login</li>
            </Link>

            <Link style={navStyle} to="/predict">
                <li>Predict</li>
            </Link>
        </ul>
    </nav>
    );
}

export default Nav;