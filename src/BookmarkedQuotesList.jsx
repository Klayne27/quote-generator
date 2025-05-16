function BookmarkedQuotesList({ quotes, onRemoveBookmark }) {
  return (
    <div>
      {quotes.map((quote) => (
        <div key={quote.id}>{quote.text}</div>
      ))}
    </div>
  );
}

export default BookmarkedQuotesList;
