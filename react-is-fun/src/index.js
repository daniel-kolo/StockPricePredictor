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
import App from './containers/App'

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)