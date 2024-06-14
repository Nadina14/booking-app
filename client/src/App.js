import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Hotel from "./pages/Hotel/Hotel.jsx";
import List from "./pages/List/List.jsx";
import Login from "./pages/Login/Login.jsx";
import Registration from "./pages/Register/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;