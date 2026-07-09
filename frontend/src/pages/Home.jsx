import { useEffect, useState } from "react";
import { getAll } from "../services/post.service";
import PostCard from "../components/PostCard";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAll();
      await new Promise((resolve) => setTimeout(resolve, 300));

      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={`No se pudieron cargar los posts. ${error}`}
        onRetry={fetchPosts}
      />
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        message="No hay posts todavía."
        actionText="Crear Post"
        actionLink="/crear"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
