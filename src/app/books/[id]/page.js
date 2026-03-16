import { db } from "@/utils/connect";
import { getUser } from "@/utils/getUser";
import { Content } from "next/font/google";
import Image from "next/image";

import { redirect } from "next/navigation";

export default async function SingleBookPage({ params }) {
  //make user loging
  const user = await getUser();

  //get the book id from the UL params
  const { id } = await params;

  //get the book from the database by it's id
  const book = (await db.query(`SELECT * FROM books WHERE id = $1`, [id]))
    .rows[0];

  // if the book doesn exist we could redirect or show a massage

  // const reviewsResult = (
  //   await db.query(
  //     `SELECT  reviews.content, user_account.username FROM reviews
  //   JOIN user_account
  //   ON reviews.user_account_id = user_account.id
  //   WHERE reviews.book_id= $1`,
  //     // id = ${variablename}(id of the book)
  //     [id],
  //   )
  // ).rows;

  const reviewsResult = (
    await db.query(
      `SELECT reviews.*,  user_account.username
     FROM reviews
     JOIN user_account
     ON reviews.user_account_id = user_account.id
     WHERE reviews.book_id = $1`,
      [id],
    )
  ).rows;
  console.log(reviewsResult);
  // async function handleSubmitReview(formData) {
  //   "use server";
  //   //extract content  value  from form
  //   const { content } = Object.fromEntries(formData);

  //   //get the currently loogged in user details
  //   const user = await getUser();

  //   await db.query(
  //     `INSERT INTO reviews(user_id, book_id, content) VALUES ($1, $2, $3)`,
  //     [user[0].id, id, content],
  //   );
  //   redirect(`/books/${id}`);
  // }

  async function handleSubmitReview(formData) {
    "use server";

    const { content } = Object.fromEntries(formData);
    const user = await getUser();

    await db.query(
      `INSERT INTO reviews(user_account_id, book_id, content) VALUES ($1, $2, $3)`,
      [user[0].id, id, content],
    );

    redirect(`/books/${id}`);
  }

  //   const review = [];
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex gap-8 mb-10">
        {book.img_url && (
          <Image
            src={book.img_url}
            width={100}
            height={100}
            alt={book.title}
            className="w-48 aspect-2/3 object-cover rounded shrink-0"
          />
        )}
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          {book.release_date && (
            <p className="text-sm opacity-40 mt-1">
              {" "}
              {new Date(book.release_date).toLocaleDateString()}
            </p>
          )}
          {book.description && <p className="mt-4"> {book.description}</p>}
          {book.quote && (
            <p className="mt-4 italic opacity-70">`{book.quote}`</p>
          )}
        </div>
      </div>
      <h2>Leave a Review</h2>
      <form action={handleSubmitReview} className=" flex flex-col gap-4">
        <textarea name="content" placeholder="write your review.." required />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
      <h2>Reviews</h2>
      {reviewsResult.length === 0 ? (
        <p>No review yet.be the first!</p>
      ) : (
        <ul>
          {reviewsResult?.map((review) => (
            <li key={review.id}>
              <div className="bg-amber-50 m-1 p-1">
                <p className="">{review.username}</p>
                <p>{review.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
