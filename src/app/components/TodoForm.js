export default function TodoForm({
  state,
  handleChange,
  handleSubmit,
  cancelEdit,
}) {
  console.log("Form rendering");

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl mt-6 w-full max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4" method="POST">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold text-lg">Title</label>
          <input
            type="text"
            name="title"
            value={state.formData.title}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold text-lg">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={state.formData.description}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            onChange={handleChange}
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {state.editId !== null ? "Update" : "Add Todo"}
          </button>
          {state.editId !== null && (
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
