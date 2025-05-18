import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../settingsSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Sidebar({activeTab, onTabChange}) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  const tabClasses =
    "font-semibold sm:w-60 flex justify-center items-center px-2 py-3 sm:p-4 text-lg sm:text-3xl transition-colors cursor-pointer";
  
  const activeTabClasses = "bg-light-3 dark:bg-dark-3 text-light-4 dark:text-dark-4";
  const inactiveTabClasses =
    "hover:bg-light-3 dark:hover:bg-dark-3 text-light-4 dark:text-dark-4";

  return (
    <div className="flex sm:flex-col justify-between sm:py-16 items-center relative bg-light-2 dark:bg-dark-2 transition-colors">
      <div className="flex sm:flex-col">
        <div
          className={`${tabClasses} ${
            activeTab === "generator" ? activeTabClasses : inactiveTabClasses
          }`}
          onClick={() => onTabChange("generator")}
        >
          <p>Generator</p>
        </div>

        <div
          className={`${tabClasses} ${
            activeTab === "bookmarks" ? activeTabClasses : inactiveTabClasses
          }`}
          onClick={() => onTabChange("bookmarks")}
        >
          <p>Bookmarks</p>
        </div>
      </div>
      <div>
        <div
          onClick={toggleTheme}
          className="cursor-pointer active:scale-95 transition duration-200 text-sm sm:text-xl mr-2"
        >
          {theme === "light" ? (
            <p className="flex gap-2 items-center  text-light-4">
              <MdDarkMode />
              Dark Mode
            </p>
          ) : (
            <p className="flex gap-2 items-center  text-dark-4">
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
