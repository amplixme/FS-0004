import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../services/post.service";
import PostForm from "../components/PostForm";

function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    setLoading(true);

    try {
      const newPost = await create(data);
      navigate(`/posts/${newPost.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crear nuevo post</h1>

      <PostForm
        onSubmit={handleCreate}
        loading={loading}
        buttonText="Crear post"
        buttonClassName="px-8 py-3.5 rounded-full text-m font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      />
    </div>
  );
}

export default CreatePost;
