import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getById, deletePost } from "../services/post.service";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/common/ConfirmModal";
import Swal from "sweetalert2";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getById(id);
        setPost(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(post.id);

      setShowModal(false);

      await Swal.fire({
        icon: "success",
        title: "Artículo eliminado",
        text: "El artículo fue eliminado correctamente.",
        confirmButtonColor: "#16a34a",
      });

      navigate("/");
    } catch (err) {
      setShowModal(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo eliminar el artículo.",
        confirmButtonColor: "#dc2626",
      });
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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          ← Volver a inicio
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        <p className="text-lg">Post no encontrado.</p>
      </div>
    );
  }

  const isAuthor = user?.id === post.authorId;

  const formattedDate = new Date(post.createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="min-h-screen bg-white antialiased">
        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          <Link
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mb-8 text-left"
          >
            ← Volver a inicio
          </Link>

          {post.coverImage && (
            <div className="mb-8 w-full rounded-2xl overflow-hidden aspect-video shadow-md">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.15] text-left">
            {post.title}
          </h1>

          <div className="mt-8 flex items-center gap-3.5 pb-8 border-b border-gray-100">
            <div className="text-sm">
              <p className="text-gray-500 flex items-center gap-2 mt-0.5">
                <span>{formattedDate}</span>
              </p>
            </div>
          </div>

          <article className="mt-10 prose prose-neutral prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-1xl sm:text-2xl leading-[1.8] text-gray-800 font-normal tracking-normal space-y-6 text-left">
              {post.content}
            </div>
          </article>

          {isAuthor && (
            <div className="mt-14 pt-6 border-t border-gray-100 flex gap-3 justify-end">
              <Link
                to={`/posts/${post.id}/edit`}
                className="px-8 py-3.5 rounded-full text-m font-medium text-gray-600 bg-gray-300 hover:bg-gray-100 transition-colors"
              >
                Editar
              </Link>

              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3.5 rounded-full text-m font-medium text-white bg-red-600 hover:bg-red-500 transition-colors"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        title="Eliminar artículo"
        message="¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer."
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default PostDetail;