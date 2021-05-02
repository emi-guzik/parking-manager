import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHighestId, getParkingSpotsByFloorState, getParkingFloors } from '../redux/selectors';
import { Link } from 'react-router-dom';
import { SPOT_TYPE } from '../constants';

export default function AddParkingSpot() {
  const dispatch = useDispatch();
  const parkingSpotsByFloor = useSelector(getParkingSpotsByFloorState);
  let timer;

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    // Load only if Spots state is empty
    if (Object.keys(parkingSpotsByFloor).length === 0) {
      dispatch({ type: 'LOAD_PARKING_SPOTS' });
    }
  }, [dispatch, parkingSpotsByFloor]);

  const [available] = useState(true);
  const [spotType, setSpotType] = useState('Large');
  const [floor, setFloor] = useState(1);
  const [successMessageVisible, setSuccessMessageVisibility] = useState(false);

  let highestId = useSelector(getHighestId);
  const parkingFloors = useSelector((state) => getParkingFloors(state));

  function handleAddParkingSpot(event) {
    event.preventDefault();
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
    setSuccessMessageVisibility(true);

    // Hide success message after 3s
    timer = setTimeout(() => {
      setSuccessMessageVisibility(false);
    }, 3000);
  }

  return (
    <div>
      <div className="add-parking-spot-container">
        <form action="">
          <div className="add-parking-spot-title">Add parking spot</div>
          <label htmlFor="spotType">
            Spot type:
            <div className="select">
              <select name="spotType" value={spotType} onChange={(event) => setSpotType(event.target.value)}>
                {Object.keys(SPOT_TYPE).map((key, index) => (
                  <option key={index} value={SPOT_TYPE[key]}>
                    {SPOT_TYPE[key]}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label htmlFor="spotFloor">
            Floor:
            <div className="select">
              <select name="spotFloor" value={floor} onChange={(event) => setFloor(event.target.value)}>
                {parkingFloors.map((floor, index) => (
                  <option key={index} value={floor}>
                    {floor}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <div className="form-footer">
            <button className="simple-button" onClick={handleAddParkingSpot}>
              Save
            </button>
            {successMessageVisible ? <div className="form-success-message">Spot added!</div> : <div></div>}
          </div>
        </form>
      </div>
      <div className="back-button-container">
        <Link className="simple-button back-button" to="/">
          Back
        </Link>
      </div>
    </div>
  );
}
