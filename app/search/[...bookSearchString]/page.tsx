import axios from 'axios';
import Image from 'next/image';

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
  return data.data.books;
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
  console.log(params);
  const books = await getData(
    params.bookSearchString[0],
    params.bookSearchString[1]
  );
  return (
    <div>
      <h1>Book List</h1>
      {books.map((book: bookData) => (
        <div key={book.isbn}>
          <h1>{book.title}</h1>
          <img src={book.image} className="w-16" />
        </div>
      ))}
    </div>
  );
};

export default bookList;
