import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setTheme } from "../settingsSlice";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Sidebar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  const linkClasses =
    "font-semibold w-60 flex justify-center items-center p-4 text-3xl transition-colors";

  const activeClasses = "bg-light-3 dark:bg-dark-3";
  const hoverClasses = "hover:bg-light-3 dark:hover:bg-dark-3"; 
  const themeText = "text-light-4 dark:text-dark-4"

  return (
    <div className="flex flex-col justify-between py-16 items-center relative bg-light-2 dark:bg-dark-2">
      <div className="flex flex-col">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClasses : hoverClasses} ${themeText}`
          }
        >
          <p>Generator</p>
        </NavLink>
        <NavLink
          to="/bookmarks"
          end
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClasses : hoverClasses} ${themeText}`
          }
        >
          <p>Bookmarks</p>
        </NavLink>
      </div>
      <div>
        <div
          onClick={toggleTheme}
          className="cursor-pointer active:scale-95 transition duration-200"
        >
          {theme === "dark" ? (
            <p className="flex gap-2 items-center text-xl text-dark-4">
              <MdDarkMode />
              Dark Mode
            </p>
          ) : (
            <p className="flex gap-2 items-center text-xl text-light-4">
              <MdLightMode />
              Light Mode
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
