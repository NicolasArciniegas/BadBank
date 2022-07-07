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
              <Nav.Link>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "rgb(153, 182, 250)",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "white")}
                  onMouseOut={(e) =>
                    (e.target.style.color = "rgb(153, 182, 250)")
                  }
                  to="/"
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/allData"
                  style={{
                    textDecoration: "none",
                    color: "rgb(153, 182, 250)",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "white")}
                  onMouseOut={(e) =>
                    (e.target.style.color = "rgb(153, 182, 250)")
                  }
                >
                  All data
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "rgb(153, 182, 250)",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "white")}
                  onMouseOut={(e) =>
                    (e.target.style.color = "rgb(153, 182, 250)")
                  }
                  to="/login"
                >
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "rgb(153, 182, 250)",
                  }}
                  to="/register"
                  onMouseOver={(e) => (e.target.style.color = "white")}
                  onMouseOut={(e) =>
                    (e.target.style.color = "rgb(153, 182, 250)")
                  }
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
