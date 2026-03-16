// import { getUser } from "@/utils/getUser";
// import { db } from "@/utils/connect";
// import Link from "next/link";
// import { currentUser } from "@clerk/nextjs/server";

// export default async function UserPage() {
//   const user = await getUser();

//   // this will always read the currently looged in user
//   // could we read from params to get other user profiles?
//   console.log(user[0]);
//   return (
//     <div>
//       <h5 className=" text-3xl text-center "> This is the user page</h5>
//       <h4 className="text-4xl"> {currentUser.name}'s Profile' </h4>
//       <p>
//         <strong>Name:</strong> {currentUser.name}
//       </p>

//       <p>
//         <strong>Bio:</strong>
//       </p>
//       <p>{user[0].bio}</p>
//       <p>{currentUser.bio ? currentUser.bio : "No bio added yet."}</p>

//       <Link href="/edit-profile">Edit Profile</Link>
//     </div>
//   );
// }

// import { getUser } from "@/utils/getUser";
// import { currentUser } from "@clerk/nextjs/server";

// export default async function UserPage() {
//   const clerkUser = await currentUser();
//   const user = await getUser();

//   const currentBio = user[0]?.bio;

//   return (
//     <div>
//       <h1>{clerkUser?.firstName}'s Profile</h1>

//       <p>
//         <strong>Your bio:</strong>
//       </p>
//       <p>{currentBio || "No bio yet. Add one below!"}</p>

//       <form action="/api/updateBio" method="POST">
//         <textarea
//           name="bio"
//           placeholder="Write something about your love for books..."
//           rows="4"
//           cols="40"
//         />

//         <br />
//         <button type="submit">Save Bio</button>
//       </form>
//     </div>
//   );
// }

import { getUser } from "@/utils/getUser";
import { db } from "@/utils/connect";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function UserPage() {
  const clerkUser = await currentUser();
  const { userId } = await auth();
  const user = await getUser();

  const currentBio = user[0]?.bio;

  async function updateBio(formData) {
    "use server";

    const { userId } = await auth();
    const bio = formData.get("bio");

    await db.query("UPDATE user_account SET bio = $1 WHERE clerk_id = $2", [
      bio,
      userId,
    ]);
    revalidatePath("/users"); // refresh profile data
    redirect("/users"); // redirect back to profile
  }

  return (
    <div>
      <div
        style={{ maxWidth: "600px", margin: "40px auto", lineHeight: "1.6" }}
      >
        <h1 className="text-3xl text-center">This is the user page</h1>

        <h2>Your Profile</h2>

        {/* <h2>
          {clerkUser?.firstName
            ? clerkUser.firstName.charAt(0).toUpperCase() +
              clerkUser.firstName.slice(1)
            : ""}
          's Profile
        </h2> */}
        {/* <h3>{clerkUser?.firstName}'s Profile</h3> */}
        <h3>{clerkUser?.firstName || user[0]?.username || "User"}'s Profile</h3>

        <p>
          <strong>Name:</strong> {user[0]?.username}
          {/* {clerkUser?.firstName
            ? clerkUser.firstName.charAt(0).toUpperCase() +
              clerkUser.firstName.slice(1)
            : ""} */}
        </p>

        <p>
          <strong>Last Name:</strong> {user[0]?.surname}
          {/* {clerkUser?.surName
            ? clerkUser.surName.charAt(0).toUpperCase() +
              clerkUser.surName.slice(1)
            : ""} */}
        </p>

        <p>
          <strong>Bio:</strong>
        </p>

        <p className="bg-emerald-100 p-2">
          {currentBio || "No bio yet. Add one below!"}
        </p>

        {!currentBio && (
          <form action={updateBio}>
            <textarea
              name="bio"
              placeholder="Write something about yourself or your love for books..."
              style={{ width: "100%" }}
            />

            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
              Save Bio
            </button>
          </form>
        )}
        {/* Edit Profile Button */}
        {userId && (
          <Link
            href={`/users/edit`}
            className="bg-blue-500 text-white p-2 mt-4 inline-block"
          >
            Edit Profile
          </Link>
        )}
      </div>
    </div>
  );
}
