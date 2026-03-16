import { db } from "@/utils/connect";
import { getUser } from "@/utils/getUser";
import Link from "next/link";
import Image from "next/image";

export default async function BooksPage() {
  const user = await getUser();

  const books = (await db.query(`SELECT * FROM books`)).rows;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">All Books</h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover books from different authors and explore new stories.
          </p>
        </div>

        <Link
          href="/books/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Book
        </Link>
      </div>

      {/* Empty State */}
      {books.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No books added yet 📚</p>
          <p className="text-sm">Start by adding your first book.</p>
        </div>
      )}

      {/* Books Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <li key={book.id}>
            <Link
              href={`/books/${book.id}`}
              className="group block bg-white rounded-xl shadow hover:shadow-lg transition p-2"
            >
              {book.img_url ? (
                <Image
                  src={book.img_url}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="w-full aspect-2/3 object-cover rounded-md"
                />
              ) : (
                <div className="w-full aspect-2/3 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm">
                  No Cover
                </div>
              )}

              <h2 className="mt-2 text-sm font-semibold group-hover:text-blue-600 transition">
                {book.title}
              </h2>

              <p className="text-xs text-gray-500">{book.author}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
