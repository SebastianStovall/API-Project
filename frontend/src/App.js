// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { SpotsIndex } from "./components/SpotsIndex";
import { SpotDetails } from "./components/SpotDetails"
import { getSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots.spots))
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSpots())
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route exact path="/">
          <SpotsIndex spots={spots} />
        </Route>
        <Route exact path="/spots/:spotId">
          <SpotDetails spots={spots} />
        </Route>
      </Switch>
      )}
    </div>
  );
}

export default App;
