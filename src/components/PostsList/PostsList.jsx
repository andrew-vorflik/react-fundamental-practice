import React, { createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { fetchedComponent } from "../../HOC/FetchedComponent";
import { PostItem } from "../PostItem/PostItem";
import classes from "./PostsList.module.scss";

const PostsList = ({ posts, postsTitle, deletePost }) => {
  if (!posts.length) {
    return <p className={classes.noPosts}>There are not posts found</p>;
  }
  return (
    <div>
      {postsTitle && <h2>{postsTitle}</h2>}
      <TransitionGroup component={"ul"} className={classes.postList}>
        {posts.map((post) => {
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
                />
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export const PostsListFetched = fetchedComponent(PostsList);
