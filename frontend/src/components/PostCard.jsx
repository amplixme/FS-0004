import { Link, useNavigate } from "react-router-dom";

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
  const { id, title, content, author, createdAt, categories = [] } = post;
  const navigate = useNavigate();

  const handleCategoryClick = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/?category=${slug}`);
  };

  const visibleCategories = categories.slice(0, 3);
  const extraCount = categories.length - 3;

  return (
    <Link
      to={`/posts/${id}`}
      className="block rounded-lg border border-neutral-800 bg-neutral-900 p-5 transition-colors hover:border-neutral-600"
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
      </div>
      
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {visibleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={(e) => handleCategoryClick(e, cat.slug)}
              className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full hover:bg-blue-600/30 transition-colors"
            >
              {cat.name}
            </button>
          ))}
          {extraCount > 0 && (
            <span className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs font-medium rounded-full">
              +{extraCount}
            </span>
          )}
        </div>
      )}

      <p className="mt-2 text-sm text-neutral-400">{truncate(content)}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <span>{author?.name || "Autor desconocido"}</span>
        <span>{formatDate(createdAt)}</span>
      </div>
    </Link>
  );
}

export default PostCard;
