import React from "react";
import Group from "./Group";
import PropTypes from "prop-types";

function Shelves({ books, moveAtherShelf }) {
  let currentlyRead, wantRead, read;

  const shelfChange = (books) => {
    currentlyRead = books.filter((book) => book.shelf === "currentlyReading");
    wantRead = books.filter((book) => book.shelf === "wantToRead");
    read = books.filter((book) => book.shelf === "read");
  };

  shelfChange(books);
  const head = {
    head1: "Currently Reading",
    head2: "Want To Read",
    head3: "Read",
  };

  return (
    <div>
      <Group
        shelf={head.head1}
        books={currentlyRead}
        moveAtherShelf={moveAtherShelf}
      />
      <Group
        shelf={head.head2}
        books={wantRead}
        moveAtherShelf={moveAtherShelf}
      />
      <Group shelf={head.head3} books={read} moveAtherShelf={moveAtherShelf} />
    </div>
  );
}

Shelves.propTypes = {
  shelfChange: PropTypes.func,
  head: PropTypes.object,
};

export default Shelves;
