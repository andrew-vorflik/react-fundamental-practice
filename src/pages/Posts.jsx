import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { postService } from "../api/postService";
import { CreatePostForm } from "../components/CreatePostForm/CreatePostForm";
import { Filters } from "../components/Filters/Filters";
import { MyModal } from "../components/MyModal/MyModal";
import { Pagination } from "../components/Pagination/Pagination";
import { PostsList, PostsListFetched } from "../components/PostsList/PostsList";
import { useFetch } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { usePosts } from "../hooks/usePosts";

export const Posts = () => {
  // States
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [filters, setFilters] = useState({ sort: "", search: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastBlock = useRef();

  // Pagination hooks
  const [allPostsCount, setAllPostsCount] = useState(0);
  const [postsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  // Custom hooks
  const sortedAndSearchedPosts = usePosts({ posts, filters });
  const { fetching, isLoading, error } = useFetch(
    async (postsPerPage, pageNumber) => {
      const { response, data } = await postService.getAllPosts({
        postsPerPage,
        pageNumber,
      });
      setPosts((prev) => [...prev, ...data]);
      setAllPostsCount(+response.headers["x-total-count"]);
    }
  );
  useObserver(
    lastBlock,
    isLoading,
    pageNumber < allPostsCount / postsPerPage,
    () => {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  );

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
    fetching(postsPerPage, pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsPerPage, pageNumber]);

  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.imageurl;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 1 });
    const postImages = document.querySelectorAll(".post-item-image");

    postImages.forEach((post) => {
      observer.observe(post);
    });

    return () => {
      observer.disconnect();
    };
  }, [posts]);

  return (
    <div className="app">
      <Button onClick={() => setIsModalOpen(true)}>Create post</Button>
      <Filters filters={filters} setFilters={setFilters} />
      <PostsList
        posts={sortedAndSearchedPosts}
        deletePost={deletePost}
        isLoading={isLoading}
        error={error}
        ref={lastBlock}
      />
      <Pagination
        allPostsCount={allPostsCount}
        postsPerPage={postsPerPage}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
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
};
