import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyles from "../GlobalStyles";

import ArtistRoute from "../ArtistRoute";

const DEFAULT_ARTIST_ID = "1LZEQNv7sE11VDY3SdxQeN";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
        <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

export default App;
