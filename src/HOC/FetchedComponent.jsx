import { Error } from "../components/Error/Error";
import { Loading } from "../components/Loading/Loading";

export const FetchedWrapCOmponent = ({ children, isLoading, error }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return children;
};
