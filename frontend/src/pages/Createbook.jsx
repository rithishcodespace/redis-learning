import { useState } from "react";

const Createbook = () => {

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    rating: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book Data:", formData);
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="w-2/5 bg-gray-200 p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-bold mb-4">Create Book</h2>

        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded"
          required
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded"
          rows="4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Createbook;
