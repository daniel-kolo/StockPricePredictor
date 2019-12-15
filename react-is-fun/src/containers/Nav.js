import React from "react";
import Login from "./Login";
import Registration from "./Registration"
import TickerList from "./tickerList"

function Nav(){
    return(
    <nav>
        <h3>Logo</h3>

        <ul className="nav-links">
            <li>Register</li>
            <li>Login</li>
            <li>Predict</li>
        </ul>
    </nav>
    );
}

export default Nav;