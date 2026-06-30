import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();

  return (
    <div className="p-6 text-neutral-300">
      <p>Detalle del post #{id} — pendiente de implementación.</p>
    </div>
  );
}

export default PostDetail;