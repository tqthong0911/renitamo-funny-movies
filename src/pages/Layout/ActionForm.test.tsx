/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import useStore from "stores";
import ActionForm from "./ActionForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ActionForm", () => {
  it("should render login form if token is not available", () => {
    const mockLogin = jest.fn();
    const mockLogout = jest.fn();
    useStore.setState((state) => ({
      data: { email: "tqthong", token: "" },
      auth: {
        data: {
          data: [],
          loading: false,
        },
        login: mockLogin,
        logout: mockLogout,
      },
    }));

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <ActionForm />
      </MemoryRouter>
    );

    expect(getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByText("Login / Register")).toBeInTheDocument();
  });

  it("should render action buttons if token is available", () => {
    useStore.setState((state) => ({
      data: { email: "tqthong", token: "tqt" },
    }));

    const { getByText } = render(
      <MemoryRouter>
        <ActionForm />
      </MemoryRouter>
    );

    expect(getByText("Share a movie")).toBeInTheDocument();
    expect(getByText("Logout")).toBeInTheDocument();
    expect(getByText("tqthong")).toBeInTheDocument();
  });

  it("should call login function when login form is submitted", async () => {
    const mockLogin = jest.fn();
    const mockLogout = jest.fn();
    useStore.setState((state) => ({
      data: { email: "tqthong", token: "" },
      auth: {
        data: {
          data: [],
          loading: false,
        },
        login: mockLogin,
        logout: mockLogout,
      },
    }));

    const { getByTestId } = render(
      <MemoryRouter>
        <ActionForm />
      </MemoryRouter>
    );

    fireEvent.input(getByTestId("test-id-email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(getByTestId("test-id-password"), {
      target: { value: "testPassword" },
    });

    fireEvent.submit(getByTestId("test-id-submit"), {
      target: {
        email: { value: "test@example.com" },
        password: { value: "testPassword" },
      },
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "testPassword",
      });
    });
  });

  it("should call navigate function when Share a movie button is clicked", () => {
    const mockNavigate = jest.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    useStore.setState((state) => ({
      data: { email: "tqthong", token: "tqt" },
    }));

    const { getByText } = render(
      <MemoryRouter>
        <ActionForm />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Share a movie"));

    expect(mockNavigate).toBeCalledWith("share");
  });

  it("should call logout function when Logout button is clicked", () => {
    const mockLogout = jest.fn();
    const mockLogin = jest.fn();

    useStore.setState((state) => ({
      data: { email: "tqthong", token: "tqt" },
      auth: {
        data: {
          data: [],
          loading: false,
        },
        login: mockLogin,
        logout: mockLogout,
      },
    }));

    const { getByText } = render(
      <MemoryRouter>
        <ActionForm />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Logout"));

    expect(mockLogout).toBeCalled();
  });
});
