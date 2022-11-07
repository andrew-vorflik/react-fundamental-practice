import React from "react";
import { Card } from "react-bootstrap";

export const PostComment = ({ email, title, body }) => {
  return (
    <Card className="mb-3">
      <Card.Header>{email}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{title}</p>
          <footer className="blockquote-footer">{body}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};
