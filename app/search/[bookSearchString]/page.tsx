import axios from 'axios';

const getData = async (query: string) => {
  // console.log(process.env.ISBN_DB_KEY);
  const data = await axios.get(
    `https://api2.isbndb.com/books/${query}?page=1&pageSize=10`,
    {
      headers: {
        Authorization: process.env.ISBN_DB_KEY,
      },
    }
  );
  return data.data.books;
};

interface BookListProps {
  params: {
    bookSearchString: string;
  };
}

const bookList: any = async ({ params }: any) => {
  const books = await getData(params.bookSearchString);
  return (
    <div>
      <h1>Book List</h1>
      {books.map((book: any) => (
        <div key={book.isbn}>
          <h1>{book.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default bookList;
