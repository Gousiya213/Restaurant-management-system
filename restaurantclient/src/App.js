import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ForgotPassword from "./pages/forgotpass";
import AddItem from "./pages/additem";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />        
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </Router>
  );
}
export default App;
