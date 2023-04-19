import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NoMatch, { NO_MATCH_ROUTER } from "./";

describe("NoMatch component", () => {
  test("should render 'Nothing to see here!' text and a link to home page", () => {
    render(
      <MemoryRouter>
        <NoMatch />
      </MemoryRouter>
    );

    expect(screen.getByText("Nothing to see here!")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Go to the home page" })
    ).toBeInTheDocument();
  });

  test("should have correct path and element for router configuration", () => {
    expect(NO_MATCH_ROUTER.path).toBe("*");
    expect(NO_MATCH_ROUTER.element).toEqual(<NoMatch />);
  });
});
