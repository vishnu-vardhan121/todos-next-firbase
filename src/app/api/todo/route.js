import { connectionDB } from "@/lib/db";
import Todos from "@/models/Todos";

// get all todos by user id

export const GET = async (req) => {
  try {
    connectionDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const todos = await Todos.find({ user: userId });

    if (!todos) {
      return Response.json({ message: "No todos found" }, { status: 404 });
    }

    return Response.json(
      { message: "see all your todos", todos },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    return Response.json({ error: err });
  }
};

// add todo

export const POST = async (req) => {
  connectionDB();
  try {
    const body = await req.json();
    if (!body || !body) {
      return Response.json({ error: "Todo is required" }, { status: 400 });
    }

    const createdTodo = await Todos.create(body);

    return Response.json({ message: "Added", todo: createdTodo });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

// update Todo

export const PUT = async (req) => {
  connectionDB();
  try {
    const { todo, id } = await req.json();
    console.log(todo, id);

    if (!id) {
      return Response.json({ error: "Todo ID is required" }, { status: 400 });
    }
    const UpdatedTodo = await Todos.findByIdAndUpdate(id, todo, { new: true });

    if (!UpdatedTodo) {
      return Response.error("NO todo found");
    }

    return Response.json({ message: "Todo Updated", todo: UpdatedTodo });
  } catch (err) {
    console.error("Update Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
};

// update status using patch

export const PATCH = async (req) => {
  try {
    const { id, status } = await req.json();
    console.log(id, status);

    const updatedTodo = await Todos.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTodo) {
      return Response.json({ message: "Todo not Found" }, { status: 404 });
    }
    return Response.json(
      { message: "todo updated", todo: updatedTodo },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "error in update todo", error: err },
      { status: 400 }
    );
  }
};
