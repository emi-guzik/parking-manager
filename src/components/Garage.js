import ParkingFloor from './ParkingFloor';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getParkingSpotsByFloorState, getParkingSpotsState } from '../redux/selectors';
import { Link } from 'react-router-dom';

export default function Garage() {
  const dispatch = useDispatch();
  const parkingSpotsByFloor = useSelector(getParkingSpotsByFloorState);
  let allParkingSpots = useSelector(getParkingSpotsState);

  useEffect(() => {
    // Load only if Spots state is empty
    if (Object.keys(parkingSpotsByFloor).length === 0) {
      dispatch({ type: 'LOAD_PARKING_SPOTS' });
    }

    return () => {};
  }, [dispatch, parkingSpotsByFloor]);

  function calculateParkingAvailability() {
    const availableSpots = allParkingSpots.filter((spot) => spot.available === true);
    return availableSpots.length;
  }

  if (parkingSpotsByFloor !== undefined && parkingSpotsByFloor !== null) {
    return (
      <div className="garage">
        <div className="garage-info">
          <div className="garage-availability">
            <h2>Garage</h2>
            <div className="availability-box">
              Spots available: {`${calculateParkingAvailability()} / ${allParkingSpots.length}`}
            </div>
            <div className="spot-keys">
              <div className="key-row">
                <div className="key-square key-square-available"></div>
                <div>spot available</div>
              </div>

              <div className="key-row">
                <div className="key-square key-square-occupied"></div>
                <div>spot occupied</div>
              </div>
            </div>
          </div>
          <Link className="simple-button add-spot-button" to="/addSpot">
            Add new spot
          </Link>
        </div>

        {Object.entries(parkingSpotsByFloor).map(([floor, spotsFromFloor]) => (
          <ParkingFloor key={floor} floor={floor} spots={spotsFromFloor} />
        ))}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
