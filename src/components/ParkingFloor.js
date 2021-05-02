import React from 'react';
import ParkingSpot from './ParkingSpot';

export default function ParkingFloor(props) {
  function calculateAvailableSpots() {
    let spots = props.spots;
    const availableSpots = spots.filter((spot) => spot.available === true);
    return availableSpots.length;
  }

  return (
    <div className="parking-floor">
      <h2>Floor {props.floor}</h2>
      <div className="availability-box">Spots available: {`${calculateAvailableSpots()} / ${props.spots.length}`}</div>
      <div className="spots-row">
        {props.spots.map((spot, index) => (
          <ParkingSpot key={index} spot={spot} />
        ))}
      </div>
    </div>
  );
}
