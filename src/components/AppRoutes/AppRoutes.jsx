import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { About } from "../../pages/About";
import { Login } from "../../pages/Login";
import { NotFound } from "../../pages/NotFound";
import { OnePost } from "../../pages/OnePost";
import { Posts } from "../../pages/Posts";
import { Navbar } from "../Navbar/Navbar";

const protectedRoutes = [
  { path: "/", element: <Posts /> },
  { path: "/post/:id", element: <OnePost /> },
  { path: "/about", element: <About /> },
  { path: "*", element: <NotFound /> },
];

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "*", element: <Login /> },
];

function AppRoutes() {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      {isAuth ? (
        <Routes>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppRoutes;
