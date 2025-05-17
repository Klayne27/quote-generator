import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import quotesData from "../../quotes.json";
import { addBookmark, removeBookmark } from "../bookmarksSlice";
import { FaHeart, FaRegCopy, FaRegHeart } from "react-icons/fa";

function removeDuplicateQuotes(dataArray) {
  const seenQuotes = new Map();
  const uniqueData = [];

  if (!Array.isArray(dataArray)) {
    console.error("Expected an array for quote data, but received:", dataArray);
    return [];
  }

  for (const item of dataArray) {
    if (
      item &&
      typeof item === "object" &&
      item.quote &&
      typeof item.quote === "string"
    ) {
      const quote = item.quote.trim();

      if (quote.length > 0 && !seenQuotes.has(quote)) {
        seenQuotes.set(quote, true);
        uniqueData.push(item);
      }
    }
  }

  return uniqueData;
}

const uniqueQuotesData = removeDuplicateQuotes(quotesData);

const categories = [
  "Filter by category",
  "motivational",
  "inspirtaional",
  "love",
  "happiness",
  "discipline",
];

function QuoteGenerator() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);

  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  const tooltipTimeoutRef = useRef(null);

  const [currentQuote, setCurrentQuote] = useState({
    quote: "",
    author: "",
    category: "",
    id: null,
  });

  const [selectedCategory, setSelectedCategory] = useState("Filter by category");

  const getRandomQuote = (category) => {
    const filteredQuotes =
      category === "Filter by category"
        ? uniqueQuotesData
        : uniqueQuotesData.filter((q) => q.category === category);

    if (filteredQuotes.length === 0) {
      return {
        quote: "No quotes found for this category.",
        author: "",
        category: category,
        id: null,
      };
    }

    const rng = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[rng];
  };

  useEffect(() => {
    return () => {
      clearTimeout(tooltipTimeoutRef.current);
    };
  }, []);

  const handleCopyQuote = () => {
    if (!currentQuote.quote) return;

    const textToCopy = `"${currentQuote.quote}" - ${currentQuote.author}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        clearTimeout(tooltipTimeoutRef.current);
        setShowCopiedTooltip(true);

        tooltipTimeoutRef.current = setTimeout(() => {
          setShowCopiedTooltip(false);
        }, 3000); 
      })
  };

  useEffect(() => {
    if (uniqueQuotesData && uniqueQuotesData.length > 0) {
      setCurrentQuote(getRandomQuote(selectedCategory));
    } else {
      setCurrentQuote({
        quote: "No quotes available.",
        author: "",
        category: "",
        id: null,
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (uniqueQuotesData && uniqueQuotesData.length > 0) {
      setCurrentQuote(getRandomQuote(selectedCategory));
    }
  }, []);

  const handleNewQuote = () => {
    if (uniqueQuotesData && uniqueQuotesData.length > 0) {
      setCurrentQuote(getRandomQuote(selectedCategory));
    } else {
      setCurrentQuote({
        quote: "No quotes available.",
        author: "",
        category: "",
        id: null,
      });
    }
  };

  const isQuoteBookmarked = bookmarks.some((b) => b.id === currentQuote.id);

  const handleBookmarkClick = () => {
    if (currentQuote.id === null) return;

    if (isQuoteBookmarked) {
      dispatch(removeBookmark(currentQuote.id));
    } else {
      dispatch(addBookmark(currentQuote));
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300 pt-12
    text-light-4
     dark:text-dark-4

    bg-gradient-to-tr from-light-1 via-[#d6d6d6] to-light-2

    dark:bg-gradient-to-tr dark:from-dark-1 dark:via-[#282e36] dark:to-dark-2
   "
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-center text-light-4 dark:text-dark-4">
        Wayne's Quote Generator
      </h1>

      <main className="flex-grow flex flex-col items-center justify-center mb-60">
        <div className=" w-[700px] flex justify-end items-center mb-15">
          <select
            id="categoryFilter"
            className="rounded-md  bg-light-2 dark:bg-dark-2 text-light-4 dark:text-dark-4 shadow-sm p-2 text-base w-full sm:w-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat?.slice(0, 1).toUpperCase() + cat?.slice(1)}
              </option>
            ))}
          </select>
        </div>{" "}
        <div className="w-full max-w-[700px] bg-light-2 dark:bg-dark-2 rounded-lg shadow-xl p-6 pb-5  flex flex-col items-center text-center transition-colors duration-300">
          <div className="flex justify-center items-center mb-6 flex-grow pb-1">
            <p className="text-xl md:text-4xl italic text-light-4 dark:text-dark-4">
              "{currentQuote.quote}"
            </p>
          </div>
          <div className="flex justify-end w-full px-7">
            <p className="text-2xl font-medium text-light-5 dark:text-[#b6b6b6] text-right pb-6">
              - {currentQuote.author}
            </p>
          </div>

          <div className="flex justify-between items-center w-full mt-4 border-t border-light-4 dark:border-dark-4 pt-5 px-2">
            <div className="flex gap-2">
              <button
                className="border-2 rounded-full p-2 text-xl flex items-center justify-center cursor-pointer active:scale-90 transition duration-200 text-light-4 dark:text-dark-4"
                onClick={handleCopyQuote}
                disabled={!currentQuote.quote}
                title="Copy quote to clipboard"
              >
                <FaRegCopy />
              </button>

              {showCopiedTooltip && (
                <div
                  className={`absolute -translate-15 left mt-6
                             px-3 py-1 bg-dark-3 dark:bg-dark-3 text-light-4 dark:text-dark-4
                             text-base rounded shadow-md whitespace-nowrap z-60
                             opacity-100 transition-discrete duration-300`}
                >
                  Copied to clipboard!
                </div>
              )}

              {isQuoteBookmarked ? (
                <button
                  className="border-2 rounded-full p-2 text-xl flex items-center justify-center cursor-pointer text-red-600 active:scale-90 transition duration-200 "
                  onClick={handleBookmarkClick}
                  disabled={!currentQuote.id}
                >
                  <FaHeart />
                </button>
              ) : (
                <button
                  className="border-2 rounded-full p-2 text-xl flex items-center justify-center cursor-pointer active:scale-90 transition duration-200 text-light-4 dark:text-dark-4"
                  onClick={handleBookmarkClick}
                  disabled={!currentQuote.id}
                >
                  <FaRegHeart />
                </button>
              )}
            </div>

            <button
              onClick={() => handleNewQuote()}
              className="px-6 py-2 bg-light-3 dark:bg-dark-3 active:scale-95 text-white font-semibold rounded-full shadow-md cursor-pointer transition text-lg"
            >
              New Quote
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuoteGenerator;
