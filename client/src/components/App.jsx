import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setBathrooms } from "./reducers/bathroomsSlice";
import { setUser } from "./reducers/usersSlice";
import { login, logout } from "./reducers/sessionSlice";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Bathrooms from "./components/Bathrooms/Bathrooms";
import CreateBathroom from "./components/Bathrooms/CreateBathroom";
import BathroomDetails from "./components/Bathrooms/BathroomDetails";
import User from "./components/User/User";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Search from "./components/Bathrooms/Search";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup"


function App() {
  const bathrooms = useSelector(state => state.bathrooms.bathrooms)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bathrooms")
    .then(res => res.json())
    .then(data => {
      dispatch(setBathrooms(data))
    })
  },[])


 
  useEffect(() => {
    // Check session on app mount
    fetch("/api/check_session")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("User not authenticated");
        }
      })
      .then((userData) => {
        dispatch(setUser(userData));
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        dispatch(logout()); // Logout if there's an error
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);
  if (loading) return <div>Loading...</div>;
  
  return(
    <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bathrooms" element={<Bathrooms/>} />
      <Route path="/add-bathroom" element={<CreateBathroom/>} />
      <Route path="/bathrooms/:id" element={<BathroomDetails/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/user" element={<User/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  </Router>
  )
}

export default App;