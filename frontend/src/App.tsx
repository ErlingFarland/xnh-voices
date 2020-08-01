import React from 'react';
import './App.css';

import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { FilePage } from './routes/FilePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/data/:path(.*)" component={FilePage}/>
          <Route path="/data" exact component={FilePage}/>
          <Route path="/" exact component={FilePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
