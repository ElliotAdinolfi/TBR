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
            trimmedTitle: book.data.book.title.replace(
              /[^a-zA-Z0-9]/g,
              ''
            ),
            image: book.data.book.image,
            author: book.data.book.authors[0],
            description: book.data.book.synopsis,
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

const BookInfo = async ({ params }) => {
  const [bookISBN, addtoDB] = params.bookInfo;
  const bookData = await getData(bookISBN, addtoDB);
  console.log(bookData);
  return (
    <div className="w-screen flex flex-col items-center my-8">
      {bookData !== null ? (
        <div className="flex min-w-1/2 max-w-6xl justify-between items-center py-4 my-6 px-4 max-sm:flex-col">
          <div className="w-1/2 flex justify-normal-end flex-col max-sm:w-screen p-6">
            <img
              src={bookData.image}
              alt={`Image of the book cover for ${bookData.title}`}
              className="w-16 shadow-md rounded-sm w-20 h-30 my-2"
            />
            <h1 className="font-bold text-3xl my-2">
              {bookData.title}
            </h1>
            <p className="text-xl my-2">{bookData.author}</p>
            <hr />
            <div className="flex ">
              <p className="my-4 flex- flex-row">
                <span className="text-lg font-bold">
                  {bookData.read}
                </span>{' '}
                readers have finished |{' '}
                <span className="text-lg font-bold">
                  {bookData.reading}
                </span>{' '}
                are reading |{' '}
                <span className="text-lg font-bold">
                  {bookData.reading}
                </span>{' '}
                want to read
              </p>
            </div>
            <hr />
            <p className="my-4">
              {bookData.description !== null
                ? bookData.description.length < 200
                  ? bookData.description
                  : bookData.description.substring(0, 200) + '...'
                : null}
            </p>
          </div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
};

export default BookInfo;
