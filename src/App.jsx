import{ useState, useEffect } from "react";
import quotesData from "../quotes.json"
import BookmarkedQuotesList from "./BookmarkedQuotesList";

function App() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [bookmarkedQuotes, setBookmarkedQuotes] = useState([]); // State for bookmarks

  // Load bookmarked quotes from Local Storage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedQuotes");
    if (savedBookmarks) {
      setBookmarkedQuotes(JSON.parse(savedBookmarks));
    }
    // Set an initial quote
    setQuote(getRandomQuote());
  }, []); // Empty array means this runs only once on mount

  // Save bookmarked quotes to Local Storage whenever the state changes
  useEffect(() => {
    localStorage.setItem("bookmarkedQuotes", JSON.stringify(bookmarkedQuotes));
  }, [bookmarkedQuotes]); // Runs whenever bookmarkedQuotes state changes

  // Function to get a random quote from the imported data
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    return quotesData[randomIndex];
  };

  // Function to handle button click for new quote
  const handleNewQuote = () => {
    setQuote(getRandomQuote());
  };

  // Function to handle bookmarking a quote
  const handleBookmark = (quoteToBookmark) => {
    const isBookmarked = bookmarkedQuotes.some((b) => b.id === quoteToBookmark.id);

    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarkedQuotes.filter(
        (b) => b.id !== quoteToBookmark.id
      );
      setBookmarkedQuotes(updatedBookmarks);
    } else {
      // Add bookmark
      setBookmarkedQuotes([...bookmarkedQuotes, quoteToBookmark]);
    }
  };

  // Check if the current quote is bookmarked
  const isCurrentQuoteBookmarked = bookmarkedQuotes.some((b) => b.id === quote.id);

  return (
    <div className="quote-container">
      <div className="quote-text">{quote.text}</div>
      <div className="quote-author">- {quote.author}</div>

      <button className="new-quote-button" onClick={handleNewQuote}>
        New Quote
      </button>

      {/* Bookmark Button */}
      <button
        className={`bookmark-button ${isCurrentQuoteBookmarked ? "bookmarked" : ""}`}
        onClick={() => handleBookmark(quote)} // Pass the current quote to the handler
      >
        {isCurrentQuoteBookmarked ? "★" : "☆"} {/* Use star icons or similar */}
        {/* You'd likely use an icon library like Font Awesome for better icons */}
      </button>
      <BookmarkedQuotesList quotes={bookmarkedQuotes} onRemoveBookmark={handleBookmark} />

    </div>
  );
}

export default App;
