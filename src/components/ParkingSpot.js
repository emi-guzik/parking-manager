import React from 'react';
import { Link } from 'react-router-dom';

export default function ParkingSpot(props) {
  return (
    <div
      className={`parking-spot ${props.spot.available === true ? 'parking-spot-available' : 'parking-spot-occupied'}`}
    >
      <div className="edit-button">
        <Link to={`/editSpot?id=${props.spot.id}`}>Edit</Link>
      </div>

      <div className="parking-spot-type">{props.spot.type}</div>
    </div>
  );
}
