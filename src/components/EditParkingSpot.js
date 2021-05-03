import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getParkingSpotById, getParkingSpotsByFloorState } from '../redux/selectors';
import SpotForm from './SpotForm';

export default function EditParkingSpot() {
  const dispatch = useDispatch();
  const parkingSpotsByFloor = useSelector(getParkingSpotsByFloorState);
  const { search } = useLocation();
  const parkingSpot = useSelector((state) => getParkingSpotById(state, getIdFromRoute()));

  const [available, setAvailable] = useState(true);
  const [spotType, setSpotType] = useState('Large');
  const [floor, setFloor] = useState(1);

  useEffect(() => {
    // Load only if parkingSpotsByFloor state is empty
    if (Object.keys(parkingSpotsByFloor).length === 0) {
      dispatch({ type: 'LOAD_PARKING_SPOTS' });
    }
  }, [dispatch, parkingSpotsByFloor]);

  useEffect(() => {
    setAvailable(parkingSpot.available);
    setSpotType(parkingSpot.type);
    setFloor(parkingSpot.floor);
  }, [parkingSpot.floor, parkingSpot.type, parkingSpot.available]);

  function getIdFromRoute() {
    const match = search.match(/id=(.*)/);
    const id = match?.[1];
    return parseInt(id, 10);
  }

  function handleEditParkingSpot(floor, spotType) {
    const floorInt = parseInt(floor, 10);
    dispatch({
      type: 'EDIT_PARKING_SPOT',
      payload: {
        id: getIdFromRoute(),
        floor: floorInt,
        type: spotType,
        available: available,
      },
    });
  }

  return <SpotForm title="Edit parking spot" floor={floor} spotType={spotType} onSaveAction={handleEditParkingSpot} />;
}
