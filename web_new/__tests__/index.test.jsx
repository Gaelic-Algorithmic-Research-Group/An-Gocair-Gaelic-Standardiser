//__tests__/index.test.jsx
import React from "react";
import { render, screen } from "../test-utils"; //note that we are importing from test-utils.js, not @testing-library/react
import Home from "../pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "An Gocair: Gaelic Standardiser",
    });

    expect(heading).toBeInTheDocument();
  });
});
