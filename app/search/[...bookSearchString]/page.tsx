import axios from 'axios';
import Image from 'next/image';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';

const getData = async (query: string, page: number) => {
  const data = await axios.get(
    `https://api2.isbndb.com/books/${query}?page=${
      page ? page : 1
    }&pageSize=10`,
    {
      headers: {
        Authorization: process.env.ISBN_DB_KEY,
      },
    }
  );
  return {
    books: data.data.books,
    total: data.data.total,
  };
};

interface bookData {
  title: string;
  image: string;
  synopsis: string;
  title_long: string;
  date_published: string;
  publisher: string;
  authors: string[];
  isbn: string;
  isbn10: string;
  isbn13: string;
  binding: string;
  language: string;
  dimensions: string;
  pages: number;
}

interface BookListProps {
  params: {
    bookSearchString: [string, number];
  };
}

const bookList = async ({ params }: BookListProps) => {
  const [query, page] = params.bookSearchString;

  const { books, total } = await getData(query, page);
  return (
    <div className="w-screen flex flex-col items-center">
      <h1>Book List</h1>
      {books.map((book: bookData) => (
        <div
          key={book.isbn}
          className="flex w-1/2 justify-between items-center"
        >
          <img src={book.image} className="w-16" />
          <h1>{book.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default bookList;
