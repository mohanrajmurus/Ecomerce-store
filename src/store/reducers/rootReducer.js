import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./CartReducer";
const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
