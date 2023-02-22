const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state,action.payload];
    case 'REMOVE_FROM_CART':
      return (state.filter(prod => prod.id !== action.payload.id))
    default:
      return state;
  }
};

export default cartReducer;
