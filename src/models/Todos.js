import mongoose from "mongoose"; // Use import instead of require

const todosSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USers",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Todos || mongoose.model("Todos", todosSchema);
