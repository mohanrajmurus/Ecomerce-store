const initialState = { byRating: 0, price: 0 };

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
