import { useState } from "react";

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
