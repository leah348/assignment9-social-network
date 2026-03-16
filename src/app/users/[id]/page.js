import { getUser } from "@/utils/getUser";
import { db } from "@/utils/connect";
import Link from "next/link";

export default async function UserPage() {
  const user = await getUser();

  // this will always read the currently looged in user
  // could we read from params to get other user profiles?
  console.log(user[0]);
  return (
    <div>
      <p> This is the user page</p>
      <p>bio:</p>
      <p>{user[0].bio}</p>
    </div>
  );
}
