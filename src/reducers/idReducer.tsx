import { ADD_ID, DELETE_ID } from "../actions/types";

const initialState = {
  movieIDs: [],
};

const idReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ID:
      if (state.movieIDs) {
        return {
          ...state,
          movieIDs: state.movieIDs.concat(action.data),
        };
      }
      return state;

    case DELETE_ID:
      return {
        ...state,
        movieIDs: state.movieIDs.filter((id) => id != action.data),
      };
    default:
      return state;
  }
};

export default idReducer;
