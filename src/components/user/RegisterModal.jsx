import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../services/user.service";
import image from "../../assets/25b2ccba8f33a5157f161b6a50f64a60.png";
const RegisterModal = ({ show, setShow, setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [emailInvali, setEmailInvali] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const handleClose = () => setShow(false);
  const handleRegister = async (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      setEmailInvali(false);
      if (password !== confirmPassword) {
        toast.error("password and confirm password not match");
        return;
      }
      try {
        const data = await register(email, name, password);
        toast.success(data.message);
        setShow(false);
        setShowLogin(true);
      } catch (error) {
        console.log(error.message);
        toast.error(error);
      }
    } else {
      setEmailInvali(true);
    }
  };
  const handleLoginEmail=()=>{
    setShow(false);
    setShowLogin(true);
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          <div className="col-7">
            <Form onSubmit={(event) => handleRegister(event)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter email"
                />
                {emailInvali && (
                  <Form.Text className="text-danger">Email Invalid</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  placeholder="Full Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
            <span onClick={()=>handleLoginEmail()} className="btn text-primary">Login with email</span>
          </div>
          <div className="col-5">
            <div className="d-flex justify-content-center align-items-center">
              <img src={image} className="w-100" alt="" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  setShowLogin: PropTypes.func.isRequired,
};
export default RegisterModal;
