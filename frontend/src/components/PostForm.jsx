import { useState, useEffect } from "react";
import { categoryAPI } from "../services/category.service";

function PostForm({
  initialData = {},
  onSubmit,
  buttonText = "Guardar",
  loading,
  buttonClassName,
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [published, setPublished] = useState(initialData.published || false);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    initialData.categories ? initialData.categories.map((c) => c.id) : []
  );

  useEffect(() => {
    categoryAPI.getAll().then(setCategories).catch(console.error);
  }, []);

  const handleCategoryChange = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    if (!content.trim()) {
      setError("El contenido es obligatorio.");
      return;
    }

    await onSubmit({
      title,
      content,
      published,
      categoryIds: selectedCategories,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      <div className="border-t border-gray-100 my-6"></div>
      <input
        placeholder="Título del post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-4xl font-semibold text-gray-900 border-none outline-none bg-transparent p-0 placeholder:text-gray-300 leading-tight block box-border"
      />

      <div className="border-t border-gray-100 my-6"></div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categorías
        </label>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selectedCategories.includes(cat.id)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Escribe el contenido del post aquí..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
        className="w-full border-none outline-none text-gray-800 font-normal text-lg resize-none"
        disabled={loading}
      />

      <div className="border-t border-gray-100 my-6"></div>
      <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
        <span className="text-gray-700 font-medium">Publicar ahora</span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <div
            className="w-14 h-8 bg-gray-200 rounded-full peer 
                    peer-checked:after:translate-x-6 
                    after:content-[''] after:absolute after:top-1 after:left-1 
                    after:bg-white after:rounded-full after:h-6 after:w-6 
                    after:transition-all peer-checked:bg-blue-600"
          ></div>
        </label>
      </div>

      <button disabled={loading} className={buttonClassName}>
        {loading ? "Guardando..." : buttonText}
      </button>
    </form>
  );
}

export default PostForm;
