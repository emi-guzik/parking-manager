import React from 'react';
import AddParkingSpot from './components/AddParkingSpot';
import AppHeader from './components/AppHeader';
import ParkingFloors from './components/ParkingFloors';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EditParkingSpot from './components/EditParkingSpot';

export default function ParkingGarageApp() {
  return (
    <div>
      <AppHeader />
      <div className="home-container">
        <BrowserRouter>
          <Switch>
            <Route path="/editSpot">
              <EditParkingSpot />
            </Route>

            <Route path="/addSpot">
              <AddParkingSpot />
            </Route>

            <Route path="/">
              <ParkingFloors />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
