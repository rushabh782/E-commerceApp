// App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/category/:categoryId" component={Category} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </Router>
  );
};

export default App;
