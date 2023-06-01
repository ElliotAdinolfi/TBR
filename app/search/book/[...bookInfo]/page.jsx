import axios from 'axios';
import { db } from '@/lib/db';

const getData = async (isbn, addtoDB) => {
  if (addtoDB === 'true') {
    const isInDB = await db.book.findFirst({
      where: {
        isbn: isbn,
      },
    });
    if (!isInDB) {
      try {
        const book = await axios.get(
          `https://api2.isbndb.com/book/${isbn}`,
          {
            headers: {
              Authorization: process.env.ISBN_DB_KEY,
            },
          }
        );
        const created = await db.book.create({
          data: {
            isbn: book.data.book.isbn13,
            title: book.data.book.title,
            image: book.data.book.image,
            author: book.data.book.authors[0],
          },
        });
        return created;
      } catch (e) {
        return null;
      }
    }
  }
  const book = await db.book.findFirst({
    where: {
      isbn: isbn,
    },
  });
  return book;
};

// interface BookInfoProps {
//   params: {
//     bookInfo: [string, string];
//   };
// }

const BookInfo = async ({ params }) => {
  const [bookISBN, addtoDB] = params.bookInfo;
  const bookData = await getData(bookISBN, addtoDB);
  console.log(bookData);
  return (
    <div className="w-screen flex flex-col items-center my-8">
      <h1>Book Info</h1>
      {bookData !== null ? (
        <div className="flex w-1/3 justify-between items-center py-4 border-solid rounded-md border-2 border-gray-200 my-6 px-4">
          <h1>{bookData.title}</h1>
          <img
            src={bookData.image}
            alt={`Image of the book cover for ${bookData.title}`}
            className="w-16"
          />
        </div>
      ) : null}
    </div>
  );
};

export default BookInfo;
