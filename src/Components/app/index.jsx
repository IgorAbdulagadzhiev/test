import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../Header';
import AboutPage from '../../pages/AboutPage';
import HomePage from '../../pages/HomePage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
