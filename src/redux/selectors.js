export const getParkingSpotsState = (store) => store.parkingSpots.allParkingSpots;

export const getParkingSpotById = (store, id) => {
  var data = getParkingSpotsState(store);

  return store.parkingSpots.allParkingSpots.length > 0 ? data.filter((spot) => spot.id === id)[0] : {};
};

export const getParkingSpotsByFloorState = (store) => store.parkingSpots.parkingSpotsByFloor;

export const getParkingFloors = (store) => store.parkingSpots.parkingFloors;

export const getHighestId = (store) => store.parkingSpots.highestSpotId;
