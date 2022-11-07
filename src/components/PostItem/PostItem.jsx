import React, { forwardRef } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import classes from "./PostItem.module.scss";

export const PostItem = forwardRef(
  ({ id, title, body, deletePost, thumbnailUrl }, ref) => {
    const onDeletePost = () => {
      deletePost(id);
    };

    return (
      <Card className={classes.card} ref={ref}>
        <Card.Body>
          <div className={classes.cardContent}>
            <Image
              src=""
              alt=""
              rounded
              data-imageurl={thumbnailUrl}
              className="me-3 post-item-image"
            />
            <div className="me-3">
              <Card.Title>
                {id}.&nbsp;
                <Link
                  to={`/post/${id}`}
                  className={`nav-link ${classes.navLinkCard}`}
                >
                  {title}
                </Link>
              </Card.Title>
              <Card.Text>{body}</Card.Text>
            </div>
            <Button variant="outline-danger" onClick={onDeletePost}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
);
