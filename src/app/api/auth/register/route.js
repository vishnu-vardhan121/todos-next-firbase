import { connectionDB } from "@/lib/db";
import Users from "@/models/Users";

export async function POST(req) {
  const { name, email, password } = await req.json();
  connectionDB();
  const userExist = await Users.findOne({ email });
  if (userExist) {
    return Response.json({ error: "User Already exists" }, { status: 400 });
  }
  const user = await Users.create({ name, password, email });

  return Response.json({ message: "User Create", user });
}
