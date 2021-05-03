import { ADD_PARKING_SPOT, LOAD_PARKING_SPOTS, EDIT_PARKING_SPOT } from '../actionTypes';
import parkingSpotsJsonData from '../../parking_spots_mock.json';

const initialState = {
  allParkingSpots: [],
  parkingSpotsByFloor: {},
  parkingFloors: [1, 2, 3],
  highestSpotId: 1,
};

export default function parkingSpots(state = initialState, action) {
  function splitSpotsByFloor(parkingSpots) {
    return parkingSpots.reduce((map, obj) => {
      map[obj.floor] = parkingSpots.filter((spot) => spot.floor === obj.floor);
      return map;
    }, {});
  }

  switch (action.type) {
    case LOAD_PARKING_SPOTS: {
      const parkingSpotsFromJson = parkingSpotsJsonData;

      // Get spot with highest id
      let spotWithHighestId = parkingSpotsFromJson.reduce((spotWithHighestId, spot) =>
        spotWithHighestId.id > spot.id ? spotWithHighestId : spot
      );

      return {
        ...state,
        allParkingSpots: parkingSpotsFromJson,
        parkingSpotsByFloor: splitSpotsByFloor(parkingSpotsFromJson),
        highestSpotId: spotWithHighestId.id,
      };
    }

    case ADD_PARKING_SPOT: {
      // Create new parking spot from payload
      const parkingSpot = {
        id: action.payload.id,
        floor: action.payload.floor,
        type: action.payload.type,
        available: action.payload.available,
      };

      const allParkingSpotsByFloors = { ...state.parkingSpotsByFloor };

      // Create floor if doesn't exist
      if (!allParkingSpotsByFloors[action.payload.floor]) {
        allParkingSpotsByFloors[action.payload.floor] = [];
      }

      allParkingSpotsByFloors[action.payload.floor].push(parkingSpot);

      return {
        ...state,
        allParkingSpots: [...state.allParkingSpots, parkingSpot],
        parkingSpotsByFloor: allParkingSpotsByFloors,
        highestSpotId: action.payload.id,
      };
    }

    case EDIT_PARKING_SPOT: {
      const parkingSpot = {
        id: action.payload.id,
        floor: action.payload.floor,
        type: action.payload.type,
        available: action.payload.available,
      };

      const allParkingSpots = [...state.allParkingSpots];

      // Find spot in allParkingSpots and update array
      var spotIndex = allParkingSpots.findIndex((spot) => spot.id === action.payload.id);
      allParkingSpots[spotIndex] = parkingSpot;

      return {
        ...state,
        allParkingSpots: allParkingSpots,
        parkingSpotsByFloor: splitSpotsByFloor(allParkingSpots),
        highestSpotId: state.highestSpotId,
      };
    }

    default:
      return state;
  }
}
