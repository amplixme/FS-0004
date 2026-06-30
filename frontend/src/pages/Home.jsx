import { useEffect, useState } from "react";
import { getAll} from "../services/post.service";
import PostCard from "../components/PostCard";

function Home(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () =>{
            try{
                setLoading(true);
                setError(null);
                const data = await getAll();
                setPosts(data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };

        fetchPosts();
    },[]);

    if(loading){
        return(
            <div className="flex justify-center py-20">
                <div
                    className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-neutral-200"
                    role= "status"
                    aria-label= "Cargando posts"
                />    
            </div>
        );
    }

    if(error){
        return(
            <div className="py-20 text-center text-sm text-red-400">
                No se pudieron cargar los posts. {error}
            </div>
        );
    }

    if (posts.length === 0){
        return(
            <div className="py-20 text-center text-sm text-neutral-500">
                No hay publicaciones todavía.
            </div>
        );
    }

    return(
        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Home
