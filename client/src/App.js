import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./COMPONENTS/Nav";
import Home from "./COMPONENTS/Home";
import SearchPage from "./COMPONENTS/SearchPage";
import TopStories from "./COMPONENTS/TopStories";
import Business from "./COMPONENTS/Business";
import Entertainment from "./COMPONENTS/Entertainment";
import Sports from "./COMPONENTS/Sports";
import Technology from "./COMPONENTS/Technology";
import General from "./COMPONENTS/General";

function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={SearchPage}/>
          <Route path="/top-stories" component={TopStories} />
          <Route path="/business" component={Business} />
          <Route path="/entertainment" component={Entertainment} />
          <Route path="/sports" component={Sports} />
          <Route path="/technology" component={Technology} />
          <Route path="/general" component={General} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
