import React from 'react'
import ReactDOM from 'react-dom'
import Login from "./containers/Login"
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'
import { tsParenthesizedType } from '@babel/types'
import RouterElement from "./containers/Router"
import Registration from "./containers/Registration"

ReactDOM.render(
    //<Message color="blue" msg="How are you?" minutes={5} />,
    //<Login/>,
    
    
    <RouterElement/>,
    
    //<Registration/>,
    document.getElementById('root')
)