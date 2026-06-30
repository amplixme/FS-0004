import { Link } from "react-router-dom";

const truncate = (text, max = 150) => {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "...";
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

function PostCard({ post }) {
  const { id, title, content, author, createdAt } = post;

  return (
    <Link
      to={`/posts/${id}`}
      className="block rounded-lg border border-neutral-800 bg-neutral-900 p-5 transition-colors hover:border-neutral-600"
    >
      <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
      <p className="mt-2 text-sm text-neutral-400">{truncate(content)}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <span>{author?.name || "Autor desconocido"}</span>
        <span>{formatDate(createdAt)}</span>
      </div>
    </Link>
  );
}

export default PostCard;
