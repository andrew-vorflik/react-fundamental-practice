import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { postService } from "./api/postService";
import { CreatePostForm } from "./components/CreatePostForm/CreatePostForm";
import { Filters } from "./components/Filters/Filters";
import { MyModal } from "./components/MyModal/MyModal";
import { PostsListFetched } from "./components/PostsList/PostsList";
import { useFetch } from "./hooks/useFetching";
import { usePosts } from "./hooks/usePosts";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [filters, setFilters] = useState({ sort: "", search: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortedAndSearchedPosts = usePosts({ posts, filters });

  const { data, isLoading, error } = useFetch(postService.getAllPosts);

  const deletePost = (postId) => {
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  const createPost = () => {
    const createdPost = {
      id: Date.now(),
      title: newPost.title,
      body: newPost.body,
    };

    setPosts((posts) => [...posts, createdPost]);
    setNewPost({ title: "", body: "" });
    setIsModalOpen(false);
  };

  useEffect(() => {
    setPosts(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="app">
      <Button onClick={() => setIsModalOpen(true)}>Create post</Button>
      <Filters filters={filters} setFilters={setFilters} />
      <PostsListFetched
        posts={sortedAndSearchedPosts}
        deletePost={deletePost}
        isLoading={isLoading}
        error={error}
      />
      <MyModal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <CreatePostForm
          newPost={newPost}
          setNewPost={setNewPost}
          createPost={createPost}
        />
      </MyModal>
    </div>
  );
}

export default App;
