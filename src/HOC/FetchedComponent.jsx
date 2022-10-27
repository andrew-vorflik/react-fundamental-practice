import { Error } from "../components/Error/Error";
import { Loading } from "../components/Loading/Loading";

export const fetchedComponent = (Component) => {
  return (props) => {
    const { isLoading, error } = props;

    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Error message={error} />;
    }

    return <Component {...props} />;
  };
};
