import React, { forwardRef } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import classes from "./PostItem.module.scss";

export const PostItem = forwardRef(({ id, title, body, deletePost }, ref) => {
  const onDeletePost = () => {
    deletePost(id);
  };

  return (
    <Card className={classes.card} ref={ref}>
      <Card.Body>
        <div className={classes.cardContent}>
          <div>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{body}</Card.Text>
          </div>
          <Button variant="outline-danger" onClick={onDeletePost}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
});
