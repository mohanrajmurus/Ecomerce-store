import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mobiles from './components/categories/Mobiles'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobile" element={<Mobiles />} />
      </Routes>
    </div>
  );
}

export default App;
