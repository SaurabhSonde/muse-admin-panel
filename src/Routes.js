import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ManageMuse from "./Components/ManageMuse";
import UpdateTemplate from "./Components/UpdateTemplate";
import App from "./App";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/managemuse" exact component={ManageMuse} />
        <Route
          path="/update/template/:templateId"
          exact
          component={UpdateTemplate}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
