import { combineReducers } from "redux";
import EstadosReducer from "./EstadosReducer";
import TransicionesReducer from "./TransicionesReducer";
import SimbolosReducer from "./SimbolosReducer";

export default combineReducers({
    estados: EstadosReducer,
    transiciones: TransicionesReducer,
    simbolos: SimbolosReducer
});