import { connectionDB } from "@/lib/db";
import Users from "@/models/Users";

export const POST = async (req) => {
  const { email, password } = await req.json();
  connectionDB();

  const user = await Users.findOne({ email });
  console.log(user);

  if (!user) {
    return Response.json({ message: "No user Found" }, { status: 404 });
  }
  if (user.password !== password) {
    return Response.json({ message: "Incorrect password" }, { status: 401 });
  }
  return Response.json({ message: "Login success", user });
};
