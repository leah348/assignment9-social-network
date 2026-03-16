import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-center gap-6 p-4 ">
      <Link href="/" className="hover:opacity-70 transition-opacity">
        Home
      </Link>
      <Link href={"/books"} className="hover:opacity-70 ransition-opacity">
        Books
      </Link>
      <Link
        href={"/users/something"}
        className="hover:opacity-70 ransition-opacity"
      >
        Your profile
      </Link>
      {/* <Link href={"/books/new"} className="hover:opacity-60 ransition-opacity">
        Add a new Book
      </Link> */}
    </nav>
  );
}
