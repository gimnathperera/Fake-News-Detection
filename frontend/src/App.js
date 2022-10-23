import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RestaurantLandingPage from "pages/RestaurantLandingPage";
import "styles/globalStyles.css";
import "tailwindcss/dist/base.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <RestaurantLandingPage />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
