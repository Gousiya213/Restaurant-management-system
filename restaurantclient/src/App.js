import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ForgotPassword from "./pages/forgotpass";

//Admin routes
import AdminHome from "./pages/admin/admin_home";
import AddItem from "./pages/admin/additem";
import Menu from "./pages/admin/menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />      
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        {/*Admin routes*/}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/additem" element={<AddItem />} />

      </Routes>
    </Router>
  );
}
export default App;

