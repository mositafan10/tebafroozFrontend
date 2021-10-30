/*

=========================================================
* Now UI Kit React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/main/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
import "./index.css"

// pages for this kit
// import Index from "views/Index.js";
// import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import Packing from "views/examples/Packing.js";
import Statice from "views/examples/Statice.js";
// import ProfilePage from "views/examples/ProfilePage.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/packing" render={(props) => <Packing {...props} />} />
        <Route path="/statice" render={(props) => <Statice {...props} />} />
        <Route path="/" render={(props) => <LoginPage {...props} />} />
        <Redirect to="/" />
        <Redirect from="/index" to="/" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
