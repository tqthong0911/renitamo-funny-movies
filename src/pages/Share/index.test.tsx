/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import userStore from "stores";
import Share, { SHARE_ROUTER } from "./";

describe("Share component", () => {
  test("should render form with correct labels and placeholders", () => {
    const { getByLabelText, getByPlaceholderText } = render(<Share />);

    expect(getByLabelText("Youtube URL:")).toBeInTheDocument();
    expect(getByPlaceholderText("URL")).toBeInTheDocument();
  });

  test("should call handleShareVideo function when form is submitted", () => {
    const shareVideoMock = jest.fn();
    userStore.setState({
      share: {
        shareVideo: shareVideoMock,
        data: { loading: false },
      },
    });

    const { getByTestId } = render(<Share />);

    const urlInput = getByTestId("test-id-url");

    fireEvent.change(urlInput, {
      target: { value: "https://www.youtube.com/watch?v=abcd" },
    });
    fireEvent.submit(getByTestId("test-id-submit"), {
      preventDefault: jest.fn(),
      target: {
        url: { value: "https://www.youtube.com/watch?v=abcd" },
      },
    });

    expect(shareVideoMock).toHaveBeenCalledTimes(1);
    expect(shareVideoMock).toHaveBeenCalledWith(
      "https://www.youtube.com/watch?v=abcd"
    );
  });

  test("should have correct path and element for router configuration", () => {
    expect(SHARE_ROUTER.path).toBe("share");
    expect(SHARE_ROUTER.element).toEqual(<Share />);
  });
});
