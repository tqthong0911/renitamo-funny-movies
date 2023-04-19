/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Header from "./Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
describe("Header component", () => {
  test("renders correctly", () => {
    const mockNavigate = jest.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(getByAltText("logo")).toBeInTheDocument();
    expect(getByText("Funny Movies")).toBeInTheDocument();
  });

  test("clicking home logo", () => {
    const mockNavigate = jest.fn();

    (useNavigate as any).mockReturnValue(mockNavigate);
    const { getByAltText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(getByAltText("logo"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
