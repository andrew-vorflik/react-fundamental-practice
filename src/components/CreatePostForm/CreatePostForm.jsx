import React from "react";
import { Button, Form } from "react-bootstrap";

export const CreatePostForm = ({ newPost, setNewPost, createPost }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Post title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter post title"
          value={newPost.title}
          onChange={(event) =>
            setNewPost((post) => ({ ...post, title: event.target.value }))
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Post content</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter post content"
          value={newPost.body}
          onChange={(event) =>
            setNewPost((post) => ({ ...post, body: event.target.value }))
          }
        />
      </Form.Group>
      <Button variant="primary" onClick={createPost}>
        Add post
      </Button>
    </Form>
  );
};
