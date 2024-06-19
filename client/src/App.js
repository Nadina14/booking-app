import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Hotel from "./pages/Hotel/Hotel.jsx";
import List from "./pages/List/List.jsx";
import User from "./components/user/User.jsx";
import { useUser } from "./context/UserContext.js";

function App() {
  
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={!user ? <User type="signup" /> : <Navigate to="/" />}/>
        <Route path="/login" element={!user ? <User type="login" /> : <Navigate to="/" />}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;