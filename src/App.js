import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mobiles from "./components/categories/Mobiles";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Electronics from "./components/categories/Electronics";
function App() {
  const dispatch = useDispatch();
  /*   const products = useSelector(state => state.product);
  console.log(products); */
  useEffect(() => {
    async function getData() {
      const res = await axios.get("https://dummyjson.com/products?limit=100");
      const products = await res.data.products;
      dispatch({
        type: "SET_PRODUCTS",
        payload: products,
      });
    }
    getData();
  });
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobile" element={<Mobiles />}/>
        <Route path="/electronics" element={<Electronics />}/>
      </Routes>
    </div>
  );
}

export default App;
