import { auth } from "@clerk/nextjs/server";
import { db } from "./connect";
import { redirect } from "next/navigation";

export async function getUser() {
  "use server";
  const { userId } = await auth();

  //   console.log(user);
  // if there is no userId, we'll the ask the user to sign in (as they're not logged in via clerk)
  if (!userId) redirect("/sign-in");

  // check database to see if it has that user in it

  const userDetails = (
    await db.query(`SELECT * FROM user_account WHERE  clerk_id = $1`, [userId])
  ).rows;

  // if nothing came back for that user
  if (userDetails.length === 0) redirect("/users/onboarding");

  return userDetails;
}
