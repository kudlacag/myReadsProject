import React from "react";
import Item from "./Item";
import PropTypes from "prop-types";

function Shelf({ books, shelf, moveAtherShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((bb) => (
            <li key={bb.id}>
              {" "}
              <Item book={bb} moveAtherShelf={moveAtherShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Shelf.propTypes = {
  books: PropTypes.array,
  shelf: PropTypes.string,
  moveAtherShelf: PropTypes.func,
};

export default Shelf;
