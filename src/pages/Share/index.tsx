import { useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import { RouteObject } from "react-router-dom";
import clsx from "clsx";
import userStore, { IStateStores } from "stores";

const selector = ({ share }: IStateStores) => ({
  loading: share.data.loading,
  shareVideo: share.shareVideo,
});

const Share = () => {
  const { shareVideo, loading } = userStore(selector);

  const handleShareVideo = useCallback(
    (event: any) => {
      const { url: urlTarget } = event.target;
      event.preventDefault();

      shareVideo(urlTarget.value);
    },
    [shareVideo]
  );

  return (
    <div
      className={clsx("d-flex", { loading })}
      style={{ minHeight: "inherit" }}
    >
      <div
        className="position-relative m-auto p-5"
        style={{
          border: "1px solid",
        }}
      >
        <p className="position-absolute bg-white" style={{ top: -14 }}>
          Share a Youtube movie
        </p>
        <Form
          data-testid="test-id-form"
          className="d-flex flex-column"
          onSubmit={handleShareVideo}
        >
          <Form.Group className=" d-flex flex-row">
            <Form.Label
              className="my-auto"
              style={{ minWidth: 100, marginRight: 4 }}
              htmlFor="formBasicURL"
            >
              Youtube URL:
            </Form.Label>
            <Form.Control
              id="formBasicURL"
              data-testid="test-id-url"
              name="url"
              placeholder="URL"
              style={{ minWidth: 240 }}
            />
          </Form.Group>
          <div className="mt-4" style={{ paddingLeft: 104 }}>
            <Button
              data-testid="test-id-submit"
              className="w-100"
              variant="primary"
              type="submit"
            >
              Share
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const SHARE_ROUTER: RouteObject = {
  path: "share",
  element: <Share />,
};

export default Share;
