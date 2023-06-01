import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import similarity from '@/lib/similarity';

import { ArrowLongRightIcon } from '@heroicons/react/20/solid';

const getData = async (query: string, page: number) => {
  const data = await axios.get(
    `https://api2.isbndb.com/books/${query}?page=${
      page ? page : 1
    }&pageSize=30`,
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
    <div className="w-screen flex flex-col items-center my-8">
      <h1 className="font-bold text-center text-2xl py-8">
        Results for{' '}
        {query
          .replaceAll('%20', ' ')
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}
      </h1>
      {books
        .filter(
          (item: any, index: any, self: any) =>
            index ===
            self.findIndex(
              (i: any) =>
                i.authors[0] === item.authors[0] &&
                similarity(i.title, item.title) > 0.5
            )
        )
        .map((book: bookData) => (
          <Link
            href={`/search/book/${book.isbn13}/true`}
            key={book.isbn}
            className="flex lg:w-1/2 max-w-3xl justify-between items-center py-4 border-solid rounded-md border-2 border-gray-200 my-4  px-4 shadow-md"
          >
            <img src={book.image} className="w-20" />
            <div className="text-right">
              <h1 className="font-bold">
                {book.title.length < 40
                  ? book.title
                  : book.title.slice(0, 40) + '...'}
              </h1>
              <p>By {...book.authors}</p>
            </div>
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Link>
        ))}
      {/* <Pagination totalResults={total} page={page} query={query} /> */}
    </div>
  );
};

function Pagination({
  totalResults,
  page,
  query,
}: {
  totalResults: number;
  page: number;
  query: string;
}) {
  const prevPage = `/search/${query}/${Number(page) - 1}`;
  const nextPage = `/search/${query}/${Number(page) + 1}`;

  return (
    <nav
      id="pagination"
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block mr-8">
        <p className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">{Number(page) * 10 - 9}</span>{' '}
          to <span className="font-medium">{Number(page) * 10}</span>{' '}
          of <span className="font-medium">{totalResults}</span>{' '}
          results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {Number(page) - 1 > 0 && (
          <Link
            href={prevPage}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Previous
          </Link>
        )}
        {Number(page) < totalResults / 10 && (
          <Link
            href={nextPage}
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}

export default bookList;
