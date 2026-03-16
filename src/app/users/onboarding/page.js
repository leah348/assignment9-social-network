import { db } from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// import { redirect } from "next/dist/server/api-utils"

export default function OnboardingPage() {
  async function handleSubmitNewUser(formData) {
    "use server";
    //we need to submitt the username,bio and clerk id to our database
    const { username, bio } = Object.fromEntries(formData);
    const { userId } = await auth();

    const inserted = await db.query(
      `INSERT INTO user_account(username,bio,clerk_id) VALUES ($1, $2, $3)`,
      [username, bio, userId],
    );
    redirect(`/users/${userId}`);
  }

  return (
    <div>
      <h2>Sign in to our website: Please make a profile</h2>

      <form action={handleSubmitNewUser} className="flex flex-col">
        <div className="">
          <div>
            <label className="block text-sm font-medium mb-1">Usename</label>
            <input
              name="username"
              placeholder="Please write your username"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Add you Bio
            </label>
            <input
              name="bio"
              placeholder="bio"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 p-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
