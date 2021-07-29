import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/style.css'
import Main from './components/Main.js'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<BrowserRouter><Main/></BrowserRouter>,document.getElementById('root'))
