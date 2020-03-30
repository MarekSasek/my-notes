import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import notes from "./notes";


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    notes
});


export default createRootReducer;