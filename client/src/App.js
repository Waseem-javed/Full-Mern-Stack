import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Grow } from "@material-ui/core";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxidth="lg">
        <Grow in>
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth" component={Auth} />
            </Switch>
          </Container>
        </Grow>
      </Container>
    </BrowserRouter>
  );
};

export default App;
