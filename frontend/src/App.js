// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { SpotsIndex } from "./components/SpotsIndex";
import { SpotDetails } from "./components/SpotDetails"
import { CreateSpot } from "./components/CreateSpot"
import { ManageSpots } from "./components/ManageSpots";
import { UpdateSpot } from "./components/UpdateSpot";
import { getSpots } from "./store/spots";
import { Bookings } from "./components/Bookings";
import { UserBookings } from "./components/UserBookings";
import { UpdateBooking } from "./components/UpdateBooking";
import { ManageReviews } from "./components/ManageReviews";

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
        <Route exact path="/spots/new">
          <CreateSpot />
        </Route>
        <Route exact path="/spots/current">
          <ManageSpots />
        </Route>
        <Route exact path="/bookings/current">
          <UserBookings/>
        </Route>
        <Route exact path="/reviews/current">
          <ManageReviews />
        </Route>
        <Route exact path="/bookings/manage/:bookingId/:spotId">
          <UpdateBooking/>
        </Route>
        <Route exact path="/spots/:spotId/edit">
          <UpdateSpot />
        </Route>
        <Route exact path="/spots/:spotId/bookings">
          <Bookings/>
        </Route>
        <Route exact path="/spots/:spotId">
          <SpotDetails/>
        </Route>
      </Switch>
      )}
    </div>
  );
}

export default App;
