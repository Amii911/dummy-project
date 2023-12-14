import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../reducers/sessionSlice';

function NavBar() {
  const { loggedIn, currentUser } = useSelector(store => store.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const displayedLinks = loggedIn ? (
    <nav className='navbar'>
      <Link to="/">Restroom Radar NYC</Link>
      <Link to="/bathrooms">NYC Bathrooms</Link>
      <Link to="/add-bathroom">Add a New Bathroom</Link>
      <Link to="/" onClick={handleLogout}>Log Out</Link>
    </nav>
  ) : (
    <nav>
      <Link to="/signup">Sign Up</Link>
      <br />
      <Link to="/login">Log In</Link>
    </nav>
  );

  return (
    <nav className='navbar'>
      <h1>WELCOME  {currentUser ? currentUser.username : 'GUEST'} TO RESTROOM RADAR NYC</h1>
      {displayedLinks}
    </nav>
  );
}

export default NavBar;