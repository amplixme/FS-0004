import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../services/post.service";

function CreatePost(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validate = () => {
        if (!title.trim()) return " El título es obligatorio.";
        if(!content.trim()) return " El contenido es obligatorio.";
        return "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try{
            const newPost = await create ({ title, content, published});
            navigate (`/posts/${newPost.id}`);
        } catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    }

    return(
      <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crear nuevo post</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-medium mb-1">
            Contenido
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full border rounded px-3 py-2"
            disabled={loading}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="published">
            Publicar ahora (si no, se guarda como borrador)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear post"}
        </button>
      </form>
    </div>
    );
}

export default CreatePost;
