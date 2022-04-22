import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import useDebounce from "./useDebounce";
import { search, getAll } from "../BooksAPI";
import PropTypes from "prop-types";

const SearchBooks = ({ moveAtherShelf }) => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [text, setText] = useState("");
  const debouncedValue = useDebounce(text, 500);

  useEffect(() => {
    const everyBook = async () => {
      const res = await getAll();
      setAllBooks(res);
    };
    everyBook();
  }, []);

  // console.log(allBooks)

  useEffect(() => {
    let loading = true;
    if (text && loading) {
      const dataFetch = async () => {
        const res = await search(text);
        if (res.error) {
          setBooks([]);
        } else {
          setBooks(res);
        }
      };
      dataFetch();
    }

    const clear = () => {
      return (loading = false);
    };
    clear();
  }, [debouncedValue]);

  const searchedtoShelf = () => {
    const searched = allBooks.forEach((bk) => {
      // console.log(bk.shelf)
      books.map((book) => {
        if (bk.id.includes(book.id)) {
          book.shelf = bk.shelf;
        }
      });
    });

    return searched;
  };
  searchedtoShelf();

  const [showHome, setShowHome] = useState("search");

  const backHome = () => {
    setShowHome("");
  };

  return (
    <Fragment>
      {showHome === "search" && (
        <div>
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" onClick={() => backHome()}>
                Close
              </Link>

              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>

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
      )}
    </Fragment>
  );
};

SearchBooks.propTypes = {
  books: PropTypes.array,
  value: PropTypes.string,
  backHome: PropTypes.func,
};

export default SearchBooks;
