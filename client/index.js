import React from "react"
import ReactDOM from "react-dom"
import { Router, Link } from "@reach/router"
import { Heading } from "talentedunicorn-ui-kit"

import "./index.css"

import Page1 from "./exercise1.js"
import Page2 from "./exercise2.js"

const NotFound = _ => 
  <main>
    <Heading level={2} text="Sorry, this page was not found"/>
    <Link to="/">go back</Link>
  </main>

const App = _ =>  
  <>
  <Heading level={1} text="BigPay exercise"/>
  <Router>
    <Page1 path="/"/>
    <Page2 path="2"/>
    <NotFound default/>
  </Router>
  </>

ReactDOM.render(<App/>, document.querySelector('#app'))
