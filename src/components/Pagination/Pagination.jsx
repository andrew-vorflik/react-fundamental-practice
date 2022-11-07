import React, { useMemo } from "react";
import { Button } from "react-bootstrap";

export const Pagination = ({
  allPostsCount,
  postsPerPage,
  pageNumber,
  setPageNumber,
}) => {
  const pagesCount = useMemo(
    () => allPostsCount / postsPerPage,
    [allPostsCount, postsPerPage]
  );

  const pages = [...Array(pagesCount).keys()];
  const getButtonVariant = (page) => {
    return page === pageNumber ? "primary" : "outline-primary";
  };

  return (
    <div className="d-flex justify-content-center my-3">
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => setPageNumber(page + 1)}
          className="mx-2"
          variant={getButtonVariant(page + 1)}
        >
          {page + 1}
        </Button>
      ))}
    </div>
  );
};
