import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./CartReducer";
import userReducer from './userReducer'
const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user:userReducer
});

export default rootReducer;
