import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { login } from "../../services/user.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slice/accessTokenSlice";
import { Image } from "react-bootstrap";
import image from "../../assets/25b2ccba8f33a5157f161b6a50f64a60.png";
const LoginModal = ({ show, setShow,setShowRegister }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [emailInvali, setEmailInvali] = useState(false);
  const handleClose = () => setShow(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      setEmailInvali(false);
      try {
        const data = await login(email, pwd);
        toast.success(data.message);
        dispatch(setToken(data.token));
        setShow(false);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setEmailInvali(true);
    }
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleCreateAccount=()=>{
    setShow(false);
    setShowRegister(true);
  }
  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          <div className="col-7">
            <Form onSubmit={(event) => handleLogin(event)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
                {emailInvali && (
                  <Form.Text className="text-muted">Email invalidate</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={pwd}
                  onChange={(event) => setPwd(event.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
            <p className="text-primary">Forget password?</p>
            <p>You do not have account?<span onClick={()=>handleCreateAccount()} className="btn text-primary">Create account</span></p>
          </div>

          <div className="col-5">
            <div className="d-flex align-items-center">
              <Image className="w-100" src={image} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  setShowRegister: PropTypes.func.isRequired,
};
export default LoginModal;
