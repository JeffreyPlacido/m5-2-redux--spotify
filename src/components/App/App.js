import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import GlobalStyles from "../GlobalStyles";

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

import ArtistRoute from "../ArtistRoute";

const DEFAULT_ARTIST_ID = "1LZEQNv7sE11VDY3SdxQeN";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((response) => response.json())
      .then((json) => dispatch(receiveAccessToken(json.access_token)))
      .catch((error) => dispatch(receiveAccessTokenError()));
  }, []);

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
