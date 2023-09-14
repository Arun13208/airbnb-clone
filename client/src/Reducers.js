export const customerReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, user: { ...action.payload } };
    case "REMOVE_USER":
      return { ...state, user: {} };
    case "ADD_PLACES":
      return { ...state, places: [...action.payload] };
    case "ADD_USER_PLACES":
      return { ...state, userPlaces: [...action.payload] };
    case "ADD_ALL_BOOKINGS":
      return { ...state, bookings: [...action.payload] };
    default:
      return state;
  }
};
