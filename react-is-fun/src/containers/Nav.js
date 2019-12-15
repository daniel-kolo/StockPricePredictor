import React from "react";
import {Link } from "react-router-dom";

function Nav(){

    const navStyle={
        color:'black'
    };

    return(
    <nav>
        <h3>Logo</h3>

        <ul className="nav-links">
            <Link style={navStyle} to="/">
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