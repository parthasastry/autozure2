export default (state, action) => {
  switch (action.type) {
    case "GET_CARS":
      return {
        ...state,
        loading: false,
        cars: action.payload,
      };
    case "GET_FILES":
      return {
        ...state,
        loading: false,
        files: action.payload,
      };
    default:
      return state;
  }
};
