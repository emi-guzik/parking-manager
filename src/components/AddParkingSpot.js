import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHighestId, getParkingSpotsByFloorState } from '../redux/selectors';
import SpotForm from './SpotForm';

export default function AddParkingSpot() {
  const dispatch = useDispatch();
  const parkingSpotsByFloor = useSelector(getParkingSpotsByFloorState);

  const [available] = useState(true);
  const [spotType] = useState('Large');
  const [floor] = useState(1);

  let highestId = useSelector(getHighestId);

  useEffect(() => {
    // Load only if parkingSpotsByFloor state is empty
    if (Object.keys(parkingSpotsByFloor).length === 0) {
      dispatch({ type: 'LOAD_PARKING_SPOTS' });
    }
  }, [dispatch, parkingSpotsByFloor]);

  function handleAddParkingSpot(floor, spotType) {
    const floorInt = parseInt(floor, 10);
    dispatch({
      type: 'ADD_PARKING_SPOT',
      payload: {
        id: ++highestId,
        floor: floorInt,
        type: spotType,
        available: available,
      },
    });
  }

  return (
    <SpotForm
      title="Add parking spot"
      floor={floor}
      spotType={spotType}
      onSaveAction={handleAddParkingSpot}
      successMessage="Spot added!"
    />
  );
}
