import { Row, Col } from "react-bootstrap";
import { IVideo } from "common/type";

interface IProps extends IVideo {}

export default function Item(props: IProps) {
  const { id, description, subTitle, title, url } = props;

  return (
    <Row>
      <Col className="loading text-center" data-testid={`item-${id}`}>
        <iframe
          className="m-auto"
          height="200"
          src={url}
          title={title}
          onLoad={(event: any) => {
            event.target?.parentElement?.classList?.remove("loading");
          }}
        />
      </Col>
      <Col>
        <h4>{title}</h4>
        <h5>{subTitle}</h5>
        <div>{description}</div>
      </Col>
    </Row>
  );
}
