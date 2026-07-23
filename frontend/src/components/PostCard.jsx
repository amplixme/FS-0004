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
  const { id, title, content, author, createdAt, coverImage } = post;

  return (
    <Link
      to={`/posts/${id}`}
      className="rounded-lg border border-neutral-800 bg-neutral-900 overflow-hidden transition-colors hover:border-neutral-600 flex flex-col h-full"
    >
      <div className="aspect-video w-full bg-linear-to-br from-neutral-800 to-neutral-700 relative overflow-hidden shrink-0">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={title} 
            loading="lazy" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-neutral-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
      <p className="mt-2 text-sm text-neutral-400">{truncate(content)}</p>
      <div className="mt-auto pt-4 flex items-center justify-between text-xs text-neutral-500">
        <span>{author?.name || "Autor desconocido"}</span>
        <span>{formatDate(createdAt)}</span>
      </div>
      </div>
    </Link>
  );
}

export default PostCard;
