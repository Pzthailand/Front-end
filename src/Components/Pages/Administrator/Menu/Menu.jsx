import React, { useState } from 'react';

// Sample menu data with a dropdown for 'COMPUTER SET'
const menuItems = [
  /*{ name: 'ManagerUsers',  link: '/ManagerUsers', subItems: [
      { name: 'Laptops', link: '/Products' },
      { name: 'Desktops', link: '/Products' },
    ]
  },*/
  { name: 'Manager Users ', link: '/ManagerUsers' },
  { name: 'Manager Products', link: '/ManagerProducts' },
  { name: 'Manager Products Order', link: '/ManagerProductsOrder' },
];

const Menu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav style={styles.menu} >
      <ul style={styles.list}>
        {menuItems.map((item, index) => (
          <li key={item.name} style={styles.listItem}>
            <a 
              href={item.link} 
              style={styles.link} 
              onClick={item.subItems ? (e) => { e.preventDefault(); toggleDropdown(index); } : null}
              aria-haspopup={item.subItems ? "true" : "false"}
            >
              {item.name}
            </a>
            {item.subItems && openDropdown === index && (
              <ul style={styles.subList}>
                {item.subItems.map((subItem) => (
                  <li key={subItem.name} style={styles.subListItem}>
                    <a href={subItem.link} style={styles.link}>
                      {subItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  menu: {
    width: '200px',
    backgroundColor: 'white', // Semi-transparent background
    padding: '0px',
    marginTop: '30px', // Space below navbar
    position: 'sticky', // Make the menu sticky
    top: '30px', // Distance from the top of the viewport
    zIndex: 999, // Ensure it's below the navbar
    /*boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', */ // Optional shadow for depth
    cursor:'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    margin: '5px 0',
  },
  subList: {
    listStyleType: 'none',
    padding: 0,
    margin: '5px 0 0 10px', // Indent the dropdown
  },
  subListItem: {
    margin: '3px 0',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 600,
    display: 'block',
    padding: '10px',
    transition: 'background-color 0.3s',
    textAlign: 'left', // Align text to the left
  },
};

export default Menu;