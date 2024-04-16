import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUser, updateUser } from "../../../services/user.service";
import { getAllRole } from "../../../services/role.service";
const UserForm = ({
  show,
  setShow,
  user,
  setUser,
  fetchPageUser,
  setCurrentPage,
}) => {
  const [id, setId] = useState(undefined);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [locked, setLocked] = useState(false);
  const [name, setName] = useState("");
  const [roleId, setRoleId] = useState(1);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    setId(user.id);
    setEmail(user.email);
    setName(user.name);
    setPassword(user.password);
    setConfirm(user.password);
    setLocked(user.locked ? user.locked : false);
    setRoleId(user.roleId ? user.roleId : 1);
  }, [user]);
  useEffect(() => {
    fetchAllRole();
  }, []);
  const fetchAllRole = async () => {
    setRoles(await getAllRole());
  };
  const handleClose = () => {
    setShow(false);
    setUser({});
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Email invalidate");
      return;
    }
    if (password !== confirm) {
      toast.error("password and confirm password not match");
      return;
    }
    try {
      let data;
      if (id === undefined) {
        data = await createUser(email, name, password, locked, roleId);
        setCurrentPage(0);
      } else {
        data = await updateUser(id, email, name, password, locked, roleId);
      }
      fetchPageUser();
      handleClose();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Is Locked:</Form.Label>
              <div className="d-flex justify-content-between">
                <Form.Group controlId="formBasicUnlock">
                  <Form.Check
                    type="radio"
                    label="UnLock"
                    name="locked"
                    checked={!locked}
                    onChange={() => setLocked(false)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicLock">
                  <Form.Check
                    type="radio"
                    label="Locked"
                    name="locked"
                    checked={locked}
                    onChange={() => setLocked(true)}
                  />
                </Form.Group>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={roleId}
                onChange={(every) => setRoleId(every.target.value)}
                aria-label="Default select example"
              >
                {roles.map((role) => {
                  return (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
UserForm.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setName: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
  fetchPageUser: PropTypes.func,
  setCurrentPage: PropTypes.func,
};
export default UserForm;
