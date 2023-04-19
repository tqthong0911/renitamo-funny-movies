/* eslint-disable testing-library/prefer-screen-queries */
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useStore from "stores";
import Home from "./";

jest.mock("./Item", () => ({ id, description }: any) => (
  <div data-testid={`mock-item`} id={id} key={id}>
    {description}
  </div>
));

describe("Home component", () => {
  it("renders data correctly", async () => {
    const mockData = [
      {
        id: "1",
        description: "description-1",
        shareBy: "shareBy-1",
        subTitle: "subTitle-1",
        title: "title-1",
        url: "url-1",
      },
    ];

    useStore.setState((state) => ({
      home: {
        data: {
          data: mockData,
          loading: false,
        },
        initPage: jest.fn(),
      },
    }));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const items = screen.getAllByTestId(`mock-item`);
      expect(items.length).toEqual(mockData.length);
    });

    mockData.forEach((item) => {
      const itemName = screen.getByText(item.description);
      expect(itemName).toBeInTheDocument();
    });
  });

  it("renders loading state correctly", async () => {
    useStore.setState({
      home: {
        data: { data: [], loading: true },
        initPage: jest.fn(),
      },
    });

    render(<Home />);

    const container = screen.getByTestId("test-id-home");
    expect(container).toHaveClass("loading");
  });
});
