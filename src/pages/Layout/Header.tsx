import { useCallback } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "./ActionForm";

const Header = () => {
  const navigate = useNavigate();

  const handleClickHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Container className="sticky-top bg-white" style={{ zIndex: 10000 }}>
      <div className="row my-auto align-items-center" style={{ height: 64 }}>
        <div className="d-flex align-items-center col-4">
          <img
            className="me-3"
            alt="logo"
            src="/logo192.png"
            style={{ height: 48, cursor: "pointer" }}
            onClick={handleClickHome}
          />
          <h3>Funny Movies</h3>
        </div>
        <div className="col">
          <Form />
        </div>
      </div>
      <hr className="m-0" />
    </Container>
  );
};

export default Header;
