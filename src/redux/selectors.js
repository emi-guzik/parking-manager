export const getParkingSpotsState = (store) => store.parkingSpots.allParkingSpots;

export const getParkingSpotById = (store, id) => {
  var parkingSpots = getParkingSpotsState(store);

  return parkingSpots.length > 0 ? parkingSpots.filter((spot) => spot.id === id)[0] : {};
};

export const getParkingSpotsByFloorState = (store) => store.parkingSpots.parkingSpotsByFloor;

export const getParkingFloors = (store) => store.parkingSpots.parkingFloors;

export const getHighestId = (store) => store.parkingSpots.highestSpotId;
