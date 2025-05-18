import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBookmark } from "../bookmarksSlice";
import { FaTrashAlt } from "react-icons/fa";
import "../index.css"

const allCategories = [
  "Filter by category",
  "motivational",
  "inspirational",
  "love",
  "happiness",
  "discipline",
];

function BookmarksList() {
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

  const [quoteSearchTerm, setQuoteSearchTermState] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilterState] = useState("Filter by category");

  const handleQuoteSearchChange = (e) => {
    setQuoteSearchTermState(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setSelectedCategoryFilterState(e.target.value);
  };

  const handleRemoveBookmark = (id) => {
    dispatch(removeBookmark(id));
  };

  const filteredBookmarks = bookmarks.filter((quote) => {
    const authorMatch =
      quoteSearchTerm === "" ||
      quote.quote.toLowerCase().includes(quoteSearchTerm.toLowerCase());

    const categoryMatch =
      selectedCategoryFilter === "Filter by category" ||
      quote.category.toLowerCase() === selectedCategoryFilter.toLowerCase();

    return authorMatch && categoryMatch;
  });

  return (
    <div
      className="min-h-screen bg-gradient-to-tr from-light-1 via-[#d6d6d6] to-light-2
      dark:bg-gradient-to-tr dark:from-dark-1 dark:via-[#282e36] dark:to-dark-2 text-light-4
     dark:text-dark-4 flex flex-col transition-colors duration-300 pt-12"
    >
      <header className="mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-light-4 dark:text-dark-4 transition-colors">
          Bookmarked Quotes
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="p-2 w-full mx-2 sm:max-w-2xl sm:mx-auto mb-6 flex flex-col sm:flex-row items-center justify-center sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
          <input
            type="text"
            id="authorSearchInput"
            placeholder="Search Quote..."
            className="block w-full sm:w-auto flex-grow rounded-md bg-light-2 dark:bg-dark-2 text-light-4 dark:text-dark-4 shadow-sm  p-2 px-4 text-base transition-colors"
            value={quoteSearchTerm}
            onChange={handleQuoteSearchChange}
          />
          <select
            id="categoryFilterSelect"
            className="rounded-md  bg-light-2 dark:bg-dark-2 text-light-4 dark:text-dark-4 shadow-sm p-2 px-3 text-base  transition-colors"
            value={selectedCategoryFilter}
            onChange={handleCategoryFilterChange}
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat} className="text-sm sm:text-lg">
                {cat?.slice(0, 1).toUpperCase() + cat?.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mx-2 sm:max-w-2xl sm:mx-auto bg-light-2 dark:bg-dark-2 rounded-lg shadow-xl p-6 overflow-y-auto max-h-[65vh] custom-scrollbar transition-colors duration-300">
          {filteredBookmarks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic text-center py-8">
              {bookmarks.length === 0
                ? "No quotes bookmarked yet. Bookmark some from the generator!"
                : "No bookmarks match your current filter criteria."}
            </p>
          ) : (
            <ul className="space-y-6">
              {filteredBookmarks.map((quote) => (
                <li
                  key={quote.id}
                  className="border-b border-gray-500 dark:border-gray-500 pb-6 flex justify-between items-start  px-4 -mx-4 transition-colors duration-150"
                >
                  <div className="flex-grow mr-4">
                    <p className="text-lg md:text-xl italic text-gray-800 dark:text-gray-100 mb-2 transition-colors">
                      "{quote.quote}"
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 text-right mb-1 transition-colors">
                      - {quote.author}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                      {quote.category?.slice(0, 1).toUpperCase() + quote.category?.slice(1)}
                    </p>
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <button
                      onClick={() => handleRemoveBookmark(quote.id)}
                      className="transition-colors px-3 py-1 border border-red-700 text-red-700 dark:border-red-400 dark:text-red-400 rounded-md text-sm font-semibold hover:bg-red-300 dark:hover:bg-red-900 focus:outline-none cursor-pointer active:scale-90 transition duration-200"
                      title="Remove from bookmarks"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default BookmarksList;
