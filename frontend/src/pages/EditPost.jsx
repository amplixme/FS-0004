import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { getById, update } from "../services/post.service";
import { useAuth } from "../context/AuthContext";

function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getById(id);

        // Solo el autor puede editar
        if (data.authorId !== user?.id) {
          navigate(`/posts/${id}`);
          return;
        }

        setPost(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el post.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await update(id, data);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message || "No se pudo actualizar el post.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        <p className="text-lg animate-pulse">Cargando artículo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar post</h1>

      {post && (
        <PostForm
          initialData={post}
          onSubmit={handleUpdate}
          loading={false}
          buttonText="Actualizar post"
          buttonClassName="px-8 py-3.5 rounded-full text-m font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        />
      )}
    </div>
  );
}

export default EditPost;
