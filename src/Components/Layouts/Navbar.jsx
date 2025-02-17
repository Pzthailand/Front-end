import { NavLink, Link } from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedOutUsers } from '../../Components/Reducer/userSlice'; // Import your action creator
// CSS
import '../../Components/Style/Layouts/Navbar.css';
//Default avatar
import Avatar from '../../assets/Layout/Navbar/avatar.jpg'
import Cart  from '../../assets/Layout/Navbar/shopping-cart.ico'

export const Navbar = () => {
  const user = useSelector((state) => state.user); // Get user state from Redux
  const dispatch = useDispatch(); // Redux dispatch
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  const signOut = () => {
    dispatch(loggedOutUsers()); // Use action creator for logging out
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  //cart
  const [cart , setCart] = useState([])
  useEffect(() => {
    if (user && user.cart) {
      setCart(user.cart);
    }
  }, [user]);


  return (
    <header>
      <nav>
        <ul className="nav-list">
          <li><NavLink end to="/UserPage">Home</NavLink></li>
          {/*<li><NavLink to="/News">News</NavLink></li>*/}
          <li><NavLink to="/Products">Products</NavLink></li>
          {/*<li><NavLink to="/About">About</NavLink></li>*/}
          <li><NavLink to="/Contact">Contact</NavLink></li>

          <li className="dropdown">
          <NavLink to="/Refill" className="dropbtn">Refill</NavLink>
          <div className="dropdown-content">
            <ul>
              <li><Link to="/PaymentQR">Scan QR Code</Link></li>
            </ul>
          </div>
        </li>

          <li className="dropdown">
          <NavLink to="/Support" className="dropbtn">Support</NavLink>
          <div className="dropdown-content">
            <ul>
              <li><Link to="/ProblemReport">Problem Report</Link></li>
              <li><Link to="/Privacy&Policy">Privacy & Policy</Link></li>
              <li><Link to="/Termsofservice">Terms of Service</Link></li>
            </ul>
          </div>
        </li>
          
          {user && user.token ? (
            <div className="dropdown">
              <div onClick={toggleDropdown}>
                <NavLink to="#" aria-haspopup="true" aria-expanded={dropdownOpen}>

                  {/*{user.username}*/}
  
                  {user.file !== 'no_image.jpg' ? (
                        <img 
                        src={`http://127.0.0.1:8081/api/UserImages/${user.file}`}
                        alt="Current Profile"
                        className='Profileimage'
                        />
                  
                  ) : (
                    <img 
                    src={Avatar} // Default image if none exists
                    alt="Default avatar" 
                    className="Profileimage"
                  />
                  )}
    
                </NavLink>
              </div>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <li><Link to="/Profile">Profile</Link></li>
                  <li><Link to="/Account">Account</Link></li>
                  <li><Link to="/ProductsOrderList">Product Order List</Link></li>
                  <li><Link to="/ProductsCarts">Product Cart</Link></li>
                  <li><Link to="/SignIn" onClick={signOut}>Sign out</Link></li>
                </div>
              )}
            </div>
          ) : (
            <li><NavLink to="/SignIn">Sign in</NavLink></li>
          )}
          
        {/*{user && user.token ? ( 
            <li>
              <Link to="/ProductsCarts" className="cart-link">
                <div className="cart-container">
                  <img className="cart-icon" src={Cart} alt="cart" />
                  <div className="cart-count">{cart.length}</div>
                </div>
              </Link>
            </li> ) : ('')}*/}

        </ul>
      </nav>
    </header>
  );
};