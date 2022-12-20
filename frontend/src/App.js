// import logo from './logo.svg';
import "./App.css";
import Signup from "./Pages/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import DashboardPage from "./Pages/Dashboard";
import PendingRequest from "./Pages/PendingRequest";
import Profile from "./Pages/Profile";
import Verifying from "./Pages/Verifying";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/pending" element={<PendingRequest />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/waiting" element={<Verifying />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
