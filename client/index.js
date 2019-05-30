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
  <header className="App-header">
    <Heading level={1} text="BigPay interview"/>
    <Link to="/">WebSocket exercise</Link>
    <Link to="2">Github API exercise</Link>
  </header>
  <Router>
    <Page1 path="/"/>
    <Page2 path="2"/>
    <NotFound default/>
  </Router>
  </>

ReactDOM.render(<App/>, document.querySelector('#app'))
