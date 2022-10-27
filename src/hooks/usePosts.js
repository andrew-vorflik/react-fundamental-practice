import { useMemo } from "react";

export const usePosts = ({ posts, filters }) => {
  const getSortedPosts = () => {
    return [...posts].sort((a, b) => {
      const sortValue = filters.sort ? filters.sort : "title";
      return a[sortValue].localeCompare(b[sortValue]);
    });
  };

  const sortedPosts = useMemo(
    () => getSortedPosts(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posts, filters.sort]
  );

  const getSearchedPosts = () => {
    return sortedPosts.filter((post) => post.title.includes(filters.search));
  };

  // const sortedAndSearchedPosts = getSearchedPosts();
  const sortedAndSearchedPosts = useMemo(
    () => getSearchedPosts(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posts, filters]
  );

  return sortedAndSearchedPosts;
};
