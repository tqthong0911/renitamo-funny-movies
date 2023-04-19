import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "react-bootstrap";

export default function Layout() {
  return (
    <>
      <Header />
      <Container style={{ minHeight: "calc(100vh - 65px)" }}>
        <Outlet />
      </Container>
    </>
  );
}
