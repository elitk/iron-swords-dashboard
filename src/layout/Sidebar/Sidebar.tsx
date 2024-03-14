import React from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", icon: "🏠" },
  { name: "Dashboard", href: "/dashboard", icon: "📅" },
  // { name: "Profile", href: "/profile", icon: "👤" },
  // Add more navigation items here
];

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen fixed top-0 left-0 w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-20 shadow-md">
        {/* Logo or Branding */}
        <h1 className="text-3xl font-semibold">Iron Swords</h1>
      </div>
      <nav className="mt-5">
        <ul className="text-gray-300">
          {navigation.map((item) => (
            <li
              key={item.name}
              className="hover:bg-gray-700 mx-2 my-1 rounded-md"
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  "flex items-center space-x-2 p-2 rounded-md hover:text-white" +
                  (isActive ? " bg-gray-700 text-white" : "")
                }
              >
                {/* <span>
                  <i className="fas fa-home"></i>
                </span> */}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
