import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { postService } from "../api/postService";
import { PostComment } from "../components/PostComment/PostComment";
import { FetchedWrapCOmponent } from "../HOC/FetchedComponent";
import { useFetch } from "../hooks/useFetching";

export const OnePost = () => {
  const [post, setPost] = useState({ title: "", body: "" });
  const [comments, setComments] = useState([]);
  let { id } = useParams();
  const { fetching, isLoading, error } = useFetch(async (id) => {
    const responsePost = await postService.getPostById(id);
    const responsePostComments = await postService.getPostComments(id);
    setPost(responsePost.data);
    setComments(responsePostComments.data);
  });

  useEffect(() => {
    fetching(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="app">
      <FetchedWrapCOmponent isLoading={isLoading} error={error}>
        <Card className="mb-4">
          <Card.Img variant="top" src={post.url} className="post-banner" />
          <Card.Body>
            <h4>{post.title}</h4>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
        <h3>Comments:</h3>
        {comments.length === 0 && <p>There are no comments in this post</p>}
        {comments.map(({ title, body, email }) => (
          <PostComment key={email} email={email} title={title} body={body} />
        ))}
      </FetchedWrapCOmponent>
    </div>
  );
};
