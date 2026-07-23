import { useEffect, useState } from "react";
import { getAll } from "../services/post.service";
import { categoryAPI } from "../services/category.service";
import PostCard from "../components/PostCard";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [postsData, categoriesData] = await Promise.all([
        getAll(activeCategory),
        categoryAPI.getAll()
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeCategory]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={`No se pudo cargar la información. ${error}`}
        onRetry={fetchData}
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-6 gap-8">
      {/* Sidebar / Chips */}
      <aside className="w-full md:w-64 shrink-0">
        <h2 className="text-xl font-bold mb-4 hidden md:block text-slate-800">Categorías</h2>
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 hide-scrollbar">
          <button
            onClick={() => setActiveCategory('')}
            className={`whitespace-nowrap px-4 py-2 rounded-full md:rounded-lg text-left transition-colors font-medium
              ${activeCategory === '' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-full md:rounded-lg text-left transition-colors font-medium
                ${activeCategory === category.slug 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {posts.length === 0 ? (
          <EmptyState
            message={activeCategory ? "No hay posts en esta categoría." : "No hay posts todavía."}
            actionText="Crear Post"
            actionLink="/crear"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
