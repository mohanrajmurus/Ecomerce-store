const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, { ...action.payload, qty: 1 }];
    case "REMOVE_FROM_CART":
      return state.filter((prod) => prod.id !== action.payload.id);
    case "INCREASE_QTY":
      return state.map((prod) =>
        prod.id === action.payload.id
          ? Object.assign({}, prod, { qty: action.payload.qty + 1 })
          : Object.assign({}, prod, {})
      );
    case "DECREASE_QTY":
      return state.map((prod) =>
        prod.id === action.payload.id
          ? Object.assign({}, prod, { qty: action.payload.qty - 1 })
          : Object.assign({}, prod, {})
      );
    case "REMOVE_PRODUCT":
      return state.filter((prod) => prod.id !== action.payload.id);
    case 'CLEAR_CART':
      return []
    default:
      return state;
  }
};

export default cartReducer;
