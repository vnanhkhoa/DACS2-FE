import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import LearnItlogo from "../../assets/logo.svg";
import LogoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const NavbarMenu = ({ activate }) => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Container>
        <Nav.Link to="/dashboard" as={Link}>
          <Navbar.Brand className="font-weight-bolder text-white">
            <img
              src={LearnItlogo}
              alt="LearnitLogo"
              width="150"
              height="30"
              className="mr-2"
              style={{transform: "scale(1.3)"}}
            />
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="font-weight-bolder text-write"
              to="/dashboard"
              as={Link}
              active={activate === "dashboard" ? true : false}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-write"
              to="/products"
              as={Link}
              active={activate === "products" ? true : false}
            >
              Products
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-write"
              to="/bills"
              as={Link}
              active={activate === "bills" ? true : false}
            >
              Bills
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-write"
              to="/setting"
              as={Link}
              active={activate === "setting" ? true : false}
            >
              Setting
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown
                id="nav-dropdown-dark-example"
                title={username.toUpperCase()}
                menuVariant="primary"
                className="font-weight-bolder h-100"
              >
                <NavDropdown.Item onClick={logout}>
                  <img
                    src={LogoutIcon}
                    alt="logoutIcon"
                    width="32"
                    height="32"
                    className="mr-2"
                  />
                  Logout
                </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
