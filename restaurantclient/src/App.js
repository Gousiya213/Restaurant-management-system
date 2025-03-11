import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Signup from "./pages/signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />        
      </Routes>
    </Router>
  );
}
export default App;
