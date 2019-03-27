import React from "react"
import { Router, Link, Location } from "@reach/router"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Callback from './callback'
import Onboard from './onboard'
const App = () => (

      <Location>
        {({ location }) => (
            <Router location={location} className="router">
              <Callback path="actions/callback" />
              <Onboard path="actions/onboard" />
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