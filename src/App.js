import { Routes, Route, json } from "react-router-dom";
import Home from "./pages/Home";
import Mobiles from "./components/categories/Mobiles";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Electronics from "./components/categories/Electronics";
import MensFashion from "./components/categories/MensFashion";
import HomeAppliences from "./components/categories/HomeAppliences";
import Grocery from './components/categories/Grocery';
import HealthCare from "./components/categories/HealthCare";
import AutoMotive from "./components/categories/AutoMotive";
import WomensFashion from './components/categories/WomensFashion'
import LogIn from "./components/LogIn";
import Register from './components/Register'
import PrivateRouters from './components/PrivateRouters'
import ProductDetails from './pages/ProductDetails'
import ErrorRoutes from "./components/ErrorRoutes";
import CheckOutPage from "./pages/CheckOutPage";
import PaymentPage from './pages/PaymentPage'
function App() {
  const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
  //console.log(cart);
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
    /* if(sessionStorage.getItem('cart') === null|| JSON.parse(sessionStorage.getItem('cart')).length !== 0){
      const data = JSON.parse(sessionStorage.getItem('cart'))
      dispatch({
        type:'SET_CART',
        payload:data
      })
    }
    sessionStorage.setItem('cart',JSON.stringify(cart)) */
  },[]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route element={<PrivateRouters/>}>
          
          <Route path="/placeorder" element={<CheckOutPage/>}/>
          <Route path="/checkout" element={<PaymentPage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/mobile" element={<Mobiles />}/>
        <Route path="/electronics" element={<Electronics />}/>
        <Route path="/men'sfashion" element={<MensFashion />}/>
        <Route path="/women'sfashion" element={<WomensFashion />}/>
        <Route path="/healthcare" element={<HealthCare />}/>
        <Route path="/homeappliences" element={<HomeAppliences />}/>
        <Route path="/grocery" element={<Grocery />}/>
        <Route path="/automotive" element={<AutoMotive />}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/register" element ={<Register />}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="*" element={<ErrorRoutes/>}/>
        {/* <Route path="/electronics/:id" element={<ProductDetails/>}/>
        <Route path="/men'sfashion/:id" element={<ProductDetails/>}/>
        <Route path="/women'sfashion/:id" element={<ProductDetails/>}/>
        <Route path="/healthcare/:id" element={<ProductDetails/>}/>
        <Route path="/homeappliences/:id" element={<ProductDetails/>}/>
        <Route path="/grocery/:id" element={<ProductDetails/>}/>
        <Route path="/automotive/:id" element={<ProductDetails/>}/> */}

      </Routes>
    </div>
  );
}

export default App;
