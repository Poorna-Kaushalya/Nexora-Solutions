import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    technology: "",
    description: "",
    github: "",
    featured: false,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("technology", form.technology);
      formData.append("description", form.description);
      formData.append("github", form.github);
      formData.append("featured", form.featured);

      if (image) {
        formData.append("image", image); // IMPORTANT
      }

      await api.post("/projects", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Project added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error adding project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg"
      >

        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="technology"
          placeholder="Technologies (React, Node, AI...)"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="file"
          className="w-full mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="featured"
            onChange={handleChange}
          />
          Featured Project
        </label>

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Project"}
        </button>

      </form>

    </div>
  );
};

export default AddProject;