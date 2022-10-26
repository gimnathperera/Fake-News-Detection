import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RestaurantLandingPage from 'pages/RestaurantLandingPage';
import 'styles/globalStyles.css';
import 'tailwindcss/dist/base.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <RestaurantLandingPage />
          <Toaster />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
