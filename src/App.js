import React from "react";
import DiagramBuilder from "./DiagramBuilder";
import { Route, Switch, Router } from "react-router-dom";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import MyConfigurations from "./myConfigurations/MyConfigurations";
import "./cycle/cycle.js";
import history from "./history/history";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Toolbar>
          <Switch>
            <Route path="/configurations" component={MyConfigurations} />
            <Route path="/" exact component={DiagramBuilder} />
          </Switch>
        </Toolbar>
      </Router>
    );
  }
}

export default App;
