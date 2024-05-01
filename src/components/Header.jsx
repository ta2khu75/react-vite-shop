import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import RegisterModal from "./user/RegisterModal";
import { useEffect, useState } from "react";
import LoginModal from "./user/LoginModal";
import { Link } from "react-router-dom";
import { Badge, Button, Form, Image, InputGroup } from "react-bootstrap";
import logo from "../assets/ee828743c9afa9792cf20d75995e134e.png";
import { useDispatch, useSelector } from "react-redux";
import { resetToken } from "../redux/slice/accessTokenSlice";

const Header = () => {
  const cart = useSelector((state) => state.shoppingCart.value);
  const [numberCart, setNumberCart] = useState(0);
  useEffect(() => {
    setNumberCart(countCart);
  }, [cart]);
  const countCart = () => {
    let totalCount = 0;
    if (!Object.keys(cart).length > 0) return 0;
    for (const seller in cart) {
      const sellers = cart[seller];
      for (const product in sellers) {
        totalCount += Object.keys(sellers[product]).length;
      }
    }
    return totalCount;
  };
  const dispatch = useDispatch();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary d-flex justify-content-center"
      >
        <div className="w-75 d-flex justify-content-center align-items-center">
          <Navbar.Brand className="me-5" href="#">
            <Link to={"/"}>
              <Image src={logo}></Image>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Form className="w-75 me-5">
            <InputGroup>
              <InputGroup.Text id="basic-addon2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                placeholder="Fast delivery within 2 hours & right on time"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-primary">Search</Button>
            </InputGroup>
          </Form>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link
                className="d-flex align-items-center text-primary btn btn-outline-info"
                to="/"
              >
                <svg
                  className="me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                </svg>{" "}
                Home
              </Link>
              <Link className="btn btn-outline-info text-secondary" to="admin">
                Admin
              </Link>
            </Nav>
          </Navbar.Collapse>
          <NavDropdown
            className="btn btn-outline-secondary"
            title="Account"
            id="basic-nav-dropdown"
          >
            <NavDropdown.ItemText>
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </NavDropdown.ItemText>
            <NavDropdown.Header>
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            </NavDropdown.Header>
            <NavDropdown.ItemText>
              <button
                className="btn btn-outline-primary"
                onClick={() => dispatch(resetToken())}
              >
                Logout
              </button>
            </NavDropdown.ItemText>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Navbar.Collapse id="">
            <Link
              className="btn btn-outline-info text-primary"
              style={{ position: "relative" }}
              to="cart"
            >
              <b>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
              </b>
              <Badge
                pill
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  fontSize: "10px",
                }}
                bg="danger"
              >
                {numberCart}
              </Badge>
            </Link>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <RegisterModal
        setShowLogin={setShowLogin}
        show={showRegister}
        setShow={setShowRegister}
      />
      <LoginModal
        setShowRegister={setShowRegister}
        show={showLogin}
        setShow={setShowLogin}
      />
    </>
  );
};
export default Header;
