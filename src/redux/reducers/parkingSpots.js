import { ADD_PARKING_SPOT, LOAD_PARKING_SPOTS, EDIT_PARKING_SPOT } from '../actionTypes';
import parkingSpotsJsonData from '../../parking_spots_mock.json';

const initialState = {
  allParkingSpots: [],
  parkingSpotsByFloor: {},
  parkingFloors: [1, 2, 3],
  highestSpotId: 1,
};

export default function parkingSpots(state = initialState, action) {
  switch (action.type) {
    case LOAD_PARKING_SPOTS: {
      const parkingSpotsFromJson = parkingSpotsJsonData;

      const parkingSpotsByFloor = parkingSpotsFromJson.reduce((map, obj) => {
        map[obj.floor] = parkingSpotsFromJson.filter((spot, index) => spot.floor === obj.floor);
        return map;
      }, {});

      let spotWithHighestId = parkingSpotsFromJson.reduce((spotWithHighestId, Spot) =>
        spotWithHighestId.id > Spot.id ? spotWithHighestId : Spot
      );

      return {
        ...state,
        allParkingSpots: parkingSpotsFromJson,
        parkingSpotsByFloor: parkingSpotsByFloor,
        highestSpotId: spotWithHighestId.id,
      };
    }

    case ADD_PARKING_SPOT: {
      const parkingSpot = {
        id: action.payload.id,
        floor: action.payload.floor,
        type: action.payload.type,
        available: action.payload.available,
      };

      const allParkingSpotsByFloors = { ...state.parkingSpotsByFloor };
      const parkingFloor = allParkingSpotsByFloors[action.payload.floor] ?? [];

      parkingFloor.push(parkingSpot);
      allParkingSpotsByFloors[action.payload.floor] = parkingFloor;

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
      var spotIndex = allParkingSpots.findIndex((spot) => spot.id === action.payload.id);
      allParkingSpots[spotIndex] = parkingSpot;

      const allParkingSpotsByFloors = { ...state.parkingSpotsByFloor };

      // Find modified spot and check on which floor it exist
      const parkingSpotsFromState = [...state.allParkingSpots];
      const modifiedSpot = parkingSpotsFromState[spotIndex];

      if (modifiedSpot.floor !== action.payload.floor) {
        // Remove from previous floor
        const indexToRemove = allParkingSpotsByFloors[modifiedSpot.floor].findIndex(
          (spot) => spot.id === action.payload.id
        );
        allParkingSpotsByFloors[modifiedSpot.floor].splice(indexToRemove, 1);

        // Add to new floor
        allParkingSpotsByFloors[parkingSpot.floor].push(parkingSpot);
      } else {
        // Update same the floor
        const parkingFloor = allParkingSpotsByFloors[action.payload.floor] ?? [];
        var floorSpotIndex = parkingFloor.findIndex((spot) => spot.id === action.payload.id);
        parkingFloor[floorSpotIndex] = parkingSpot;
        allParkingSpotsByFloors[action.payload.floor] = parkingFloor;
      }

      return {
        ...state,
        allParkingSpots: allParkingSpots,
        parkingSpotsByFloor: allParkingSpotsByFloors,
        highestSpotId: state.highestSpotId,
      };
    }

    default:
      return state;
  }
}
