import "./App.css";
import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getAll, update } from "./BooksAPI";
import { Routes, Route, Link } from "react-router-dom";

// import ListBook from "./components/ListBook";
import SearchsBooks from "./components/SearchBooks";
import Shelves from "./components/Shelves";

const App = () => {
  // const [showSearchPage, setShowSearchpage] = useState('');

  const [books, setBooks] = useState([]);
  // console.log(books)
  useEffect(() => {
    const allBooks = async () => {
      const res = await getAll();

      return setBooks(res);
    };
    allBooks();
  }, []);

  const moveAtherShelf = (book, shelfTo) => {
    const putShelf = books.map((bk) => {
      // console.log(bk);
      if (bk.id === book.id) {
        book.shelf = shelfTo;
        return book;
      }
      return bk;
    });
    setBooks(putShelf);
    update(book, shelfTo);
  };

  // const searchBook = () => {
  //   setShowSearchpage('search');
  // }

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Fragment>
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelves books={books} moveAtherShelf={moveAtherShelf} />
                <div className="open-search">
                  <Link to="/search">
                    <button>Add A Book</button>
                  </Link>
                </div>
              </div>
            </Fragment>
          }
        />

        <Route
          exact
          path="/search"
          element={<SearchsBooks moveAtherShelf={moveAtherShelf} />}
        />
      </Routes>
    </div>
  );
};

App.propTypes = {
  books: PropTypes.array,
  moveAtherShelf: PropTypes.func,
};

export default App;
