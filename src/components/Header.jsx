import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import RegisterModal from "./user/RegisterModal";
import { useState } from "react";
import LoginModal from "./user/LoginModal";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Image } from "react-bootstrap";
import logo from "../assets/ee828743c9afa9792cf20d75995e134e.png";

const Header = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">
            <Link to={"/"}>
              <Image src={logo}></Image>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Form className="d-flex w-75">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavLink className="nav-item" to="admin">
                admin
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.ItemText>
              <button className="btn" onClick={() => setShowRegister(true)}>
                Register
              </button>
            </NavDropdown.ItemText>
            <NavDropdown.Header>
              <button className="btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
            </NavDropdown.Header>
            <NavDropdown.ItemText>
              <button onClick={() => toast.info("fdsasfdsafds")}>
                something
              </button>
            </NavDropdown.ItemText>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
      <RegisterModal show={showRegister} setShow={setShowRegister} />
      <LoginModal show={showLogin} setShow={setShowLogin} />
    </>
  );
};
export default Header;
