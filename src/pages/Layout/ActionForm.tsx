import { useCallback } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SHARE_ROUTER } from "pages/Share";
import useStore, { IStateStores } from "stores";

const selector = ({ data, auth }: IStateStores) => ({
  token: data.token,
  email: data.email,
  logout: auth.logout,
  login: auth.login,
});

const ActionForm = () => {
  const navigate = useNavigate();
  const { token, login, logout, email } = useStore(selector);

  const handleShareMovie = () => {
    navigate(SHARE_ROUTER.path as string);
  };

  const handleLogin = useCallback(
    (event: any) => {
      const { email: emailTarget, password: passwordTarget } = event.target;
      event.preventDefault();
      login({
        email: emailTarget?.value,
        password: passwordTarget?.value,
      });
    },
    [login]
  );

  if (token) {
    return (
      <div
        className="d-flex flex-col text-center"
        style={{ placeContent: "end" }}
      >
        <p className="my-auto mx-3">{email}</p>
        <Button className="mx-1" onClick={handleShareMovie}>
          Share a movie
        </Button>
        <Button className=" mx-1" variant="primary" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Form
      data-testid="test-id-form"
      className="d-flex flex-col"
      style={{ placeContent: "end" }}
      onSubmit={handleLogin}
    >
      <Form.Group className="me-3" controlId="formBasicEmail">
        <Form.Control
          data-testid="test-id-email"
          name="email"
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="me-3" controlId="formBasicPassword">
        <Form.Control
          data-testid="test-id-password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button
        data-testid="test-id-submit"
        className="flex-shrink-0 min-width-0"
        variant="primary"
        type="submit"
      >
        Login / Register
      </Button>
    </Form>
  );
};

export default ActionForm;
