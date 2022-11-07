import React from "react";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavbarBootstrap from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import classes from "./Navbar.module.scss";

export const Navbar = () => {
  const { isAuth, logout, getUser } = useAuth();
  const user = getUser();

  return (
    <NavbarBootstrap bg="dark" variant="dark">
      <div className={classes.navbarContainer}>
        <Nav className="me-auto w-100">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          {isAuth && (
            <div className="ms-auto">
              Hi,<span className="mx-2">{user.email}</span>
              <Button variant="outline-primary" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </Nav>
      </div>
    </NavbarBootstrap>
  );
};
