import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders main navigation", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const navLink = screen.getByRole("link", { name: /game board/i });
  expect(navLink).toBeInTheDocument();
});
