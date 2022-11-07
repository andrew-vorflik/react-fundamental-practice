import React, { createRef, forwardRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Loading } from "../Loading/Loading";
import { PostItem } from "../PostItem/PostItem";
import classes from "./PostsList.module.scss";

export const PostsList = forwardRef(
  ({ posts, postsTitle, deletePost, isLoading, error }, ref) => {
    return (
      <>
        {postsTitle && <h2>{postsTitle}</h2>}
        {!posts.length && (
          <p className={classes.noPosts}>There are not posts found</p>
        )}
        <TransitionGroup component={"ul"} className={classes.postList}>
          {posts.map((post, index) => {
            const itemRef = createRef(null);
            return (
              <CSSTransition
                key={post.id}
                nodeRef={itemRef}
                timeout={200}
                classNames="post"
              >
                <li ref={itemRef} className={classes.postItem}>
                  <PostItem
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    deletePost={deletePost}
                    thumbnailUrl={post.thumbnailUrl}
                  />
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <div ref={ref} />
        {isLoading && <Loading />}
      </>
    );
  }
);
