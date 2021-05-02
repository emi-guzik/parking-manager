import { ADD_PARKING_SPOT, LOAD_PARKING_SPOTS, EDIT_PARKING_SPOT } from './actionTypes';

export const loadParkingSpots = (content) => ({
  type: LOAD_PARKING_SPOTS,
  payload: {
    content,
  },
});

export const addParkingSpot = (id, floor, type, available) => ({
  type: ADD_PARKING_SPOT,
  payload: {
    id,
    floor,
    type,
    available,
  },
});

export const editParkingSpot = (id, floor, type, available) => ({
  type: EDIT_PARKING_SPOT,
  payload: {
    id,
    floor,
    type,
    available,
  },
});
