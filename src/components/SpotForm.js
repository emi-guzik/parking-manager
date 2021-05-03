import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getParkingFloors } from '../redux/selectors';
import { Link } from 'react-router-dom';
import { SPOT_TYPE } from '../constants';

export default function SpotForm(props) {
  let timer;

  const parkingFloors = useSelector((state) => getParkingFloors(state));
  const [spotType, setSpotType] = useState('Large');
  const [floor, setFloor] = useState(1);
  const [successMessageVisible, setSuccessMessageVisibility] = useState(false);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    setSpotType(props.spotType);
    setFloor(props.floor);
  }, [props.spotType, props.floor]);

  function handleSaveAction(event) {
    event.preventDefault();
    setSuccessMessageVisibility(true);

    props.onSaveAction(floor, spotType);

    // Hide success message after 3s
    timer = setTimeout(() => {
      setSuccessMessageVisibility(false);
    }, 3000);
  }

  return (
    <div>
      <div className="spot-form-container">
        <form action="">
          <div className="spot-form-title">{props.title}</div>
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
            <button className="simple-button" onClick={handleSaveAction}>
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
