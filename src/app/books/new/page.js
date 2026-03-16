import { db } from "@/utils/connect";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/getUser";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function NewBookPage() {
  //check if user is loged in
  const user = await getUser();

  const { userId } = await auth();
  const idResponse = await db.query(
    `SELECT id FROM user_account where clerk_id = $1`,
    [userId],
  );
  const { id } = await idResponse.rows[0];

  async function handleAddBook(formData) {
    "use server";
    // console.log(formData);

    const title = formData.get("title");
    const author = formData.get("author");
    const description = formData.get("description");
    const quote = formData.get("quote");
    const release_date = formData.get("release_date");
    const img_url = formData.get("img_url");

    // const { title, author, description, quote, release_date, img_url } =
    //   formData;
    // console.log(title);
    //insert the new book into the database
    const result = await db.query(
      `INSERT INTO books (title, author, description, quote, release_date, img_url,user_account_id ) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING id`,
      [
        title,
        author,
        description || null,
        quote || null,
        release_date || null,
        img_url || null,
        id,
      ],
    );
    // to the new books page
    redirect(`/book/${result.rows[0].id}`);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Add a New Book</h1>

      <form action={handleAddBook} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Book Title</label>
          <input
            name="title"
            placeholder="Book title"
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Book Author</label>
          <input
            name="author"
            placeholder="Author"
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Book Description
          </label>
          <textarea
            name="description"
            placeholder="Add description"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Book Quote</label>
          <input
            name="quote"
            placeholder="Add quote"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Book Release Date
          </label>
          <input
            name="release_date"
            type="date"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="img_url"
            placeholder="Cover image URL"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
