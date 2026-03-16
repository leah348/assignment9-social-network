import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/connect";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditProfile() {
  const { userId } = await auth();

  const user = await db.query("SELECT * FROM user_account WHERE clerk_id=$1", [
    userId,
  ]);

  const currentUser = user.rows[0];

  async function updateProfile(formData) {
    "use server";

    const username = formData.get("username");
    const surname = formData.get("surname");
    const bio = formData.get("bio");

    await db.query(
      "UPDATE user_account SET username=$1, surname=$2, bio=$3 WHERE clerk_id=$4",
      [username, surname, bio, userId],
    );

    redirect(`/users/${userId}`);
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Edit Profile</h1>

      <form action={updateProfile} className="flex flex-col gap-3">
        <input
          name="username"
          defaultValue={currentUser?.username}
          placeholder="First name"
        />

        <input
          name="surname"
          defaultValue={currentUser?.surname}
          placeholder="Last name"
        />

        <textarea
          name="bio"
          defaultValue={currentUser?.bio}
          placeholder="Your bio..."
        />

        <button className="bg-blue-500 p-2">Save Profile</button>
      </form>
    </div>
  );
}
