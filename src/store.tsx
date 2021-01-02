import { createStore, combineReducers } from "redux";
import idReducer from "./reducers/idReducer";

const rootReducer = combineReducers({
    idReducer: idReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
