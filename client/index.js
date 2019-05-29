import React from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"

import "./index.css"

import Page1 from "./exercise1.js"

const App = _ =>  
  <Router>
    <Page1 path="/"/>
  </Router>

ReactDOM.render(<App/>, document.querySelector('#app'))
