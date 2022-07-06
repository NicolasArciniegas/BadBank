import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">BadBank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/allData"
                >
                  All data
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/register"
                >
                  Create Account
                </Link>
              </Nav.Link>
              <NavDropdown title="Acciones" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/retirar">Retirar</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/transferir">Transferir</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/abonar">Abonar</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Mi dashboard
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
