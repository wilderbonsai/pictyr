import React from "react"
import { Router, Link, Location } from "@reach/router"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Filter from './filters.js'
import Images from './images'
import Users from './users'
import Contact from './contact'
import Success from './success'

const App = () => (

      <Location>
        {({ location }) => (
            <Router location={location} className="router">
              <Page path="pick" page="10" />
              <Filter path="pick/filters" />
              <Images path="pick/images" />
              <Users path="pick/users" />
              <Contact path="pick/contact" />
              <Success path="pick/success" />
            </Router>
        )}
      </Location>

)

const FadeTransitionRouter = props => (
    <Location>
      {({ location }) => (
              <Router location={location} className="router">
                {props.children}
              </Router>
      )}
    </Location>
)

const Page = props => (
    <div
        className="page"
        style={{ background: `hsl(${props.page * 75}, 60%, 60%)` }}
    >
      {props.page}
    </div>
)

export default App