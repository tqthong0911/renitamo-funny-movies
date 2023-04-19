import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Item from "./Item";

describe("Item component", () => {
  const item = {
    id: 1,
    description: "Description",
    subTitle: "Subtitle",
    title: "Title",
    url: "https://example.com",
    shareBy: "tqthong",
  };

  test('should remove "loading" class on iframe load', () => {
    render(<Item {...item} />);
    const itemElm = screen.getByTestId(`item-${1}`);
    expect(itemElm.classList.contains("loading")).toBeTruthy();

    const mockEvent1 = new Event("load", {
      bubbles: true,
      cancelable: false,
    });
    const iframeElement = screen.getByTitle("Title") as any;
    iframeElement.dispatchEvent(mockEvent1);
    expect(itemElm.classList.contains("loading")).toBeFalsy();
  });
  test("should render", () => {
    render(<Item {...item} />);
    const description = screen.getByText(item.description);
    expect(description).toBeInTheDocument();

    const subTitle = screen.getByText(item.subTitle);
    expect(subTitle).toBeInTheDocument();

    const title = screen.getByText(item.title);
    expect(title).toBeInTheDocument();
  });
});
