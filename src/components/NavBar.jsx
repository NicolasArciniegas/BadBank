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
              <Nav.Link href="/register">Create Account</Nav.Link>
              <NavDropdown title="Acciones" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/retirar">Retirar</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Transferir
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
