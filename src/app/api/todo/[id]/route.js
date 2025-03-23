import { connectionDB } from "@/lib/db";
import Todos from "@/models/Todos";

export const DELETE = async (req, { params }) => {
  try {
    connectionDB();
    const { id } = await params;
    console.log(id);

    await Todos.findByIdAndDelete(id);
    return Response.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error deleting todo", error },
      { status: 500 }
    );
  }
};
