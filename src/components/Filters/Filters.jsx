import React from "react";
import { Form } from "react-bootstrap";
import classes from "./Filters.module.scss";

const sortOptions = [
  { name: "No sort", value: "" },
  { name: "Title", value: "title" },
  { name: "Content", value: "body" },
];

export const Filters = ({ filters, setFilters }) => {
  const onSort = (event) => {
    setFilters((prevFilters) => ({ ...prevFilters, sort: event.target.value }));
  };

  const onSearch = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: event.target.value,
    }));
  };

  return (
    <Form className="d-flex my-3">
      <Form.Group
        className={`${classes.filter} me-3`}
        controlId="formBasicEmail"
      >
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search"
          value={filters.search}
          onChange={onSearch}
        />
      </Form.Group>
      <Form.Group className={`${classes.filter}`}>
        <Form.Label>Sort by</Form.Label>
        <Form.Select value={filters.sort} onChange={onSort}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
};
