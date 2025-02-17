import React from 'react';
//CSS
import '../Style/Layouts/Footer.css'

export const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <nav>
          <ul>
            {/*<li className='bottomnav-right'><a href="/about">About Us</a></li>
            <li className='bottomnav-right'><a href="/contact">Contact Us</a></li>*/}
            <p className='bottomnav-center'>© 2024 Your Website Name. All Rights Reserved.</p>
          </ul>
        </nav>
      </div>
    </footer>
  );
};