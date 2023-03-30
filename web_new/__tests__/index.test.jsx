// these are some possible tests for the home page

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

describe("Home", () => {
  it("renders model buttons", () => {
    render(<Home />);

    const button_1 = screen.getByRole("button", {
      name: "Model 1",
    });

    const button_2 = screen.getByRole("button", {
      name: "Model 2",
    });

    expect(button_1).toBeInTheDocument();
    expect(button_2).toBeInTheDocument();
  });
});

describe("Home", () => {
  it("contains a link to the home page", () => {
    render(<Home />);

    const link = screen.getByRole("link", {
      name: "Home",
    });

    expect(link).toBeInTheDocument();
  });
});
