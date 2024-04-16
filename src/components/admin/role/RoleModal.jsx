import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createRole, updateRole } from "../../../services/role.service";
const RoleModal = ({ show, setShow, role, setRole, fetchAllRole}) => {
  const handleClose = () => {setShow(false); setRole({})};
  const [id, setId] = useState(undefined);
  const [name, setName] = useState("");
  useEffect(() => {
    setId(role.id);
    setName(role.name);
  }, [role]);
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        let data;
      if (id === undefined) {
        data=await createRole(name);
      } else {
        data=await updateRole(id,name);
      }
      fetchAllRole();
      setRole({})
      setShow(false)
      toast.success(data.message)
    } catch (error) {
        toast.error(error.message)
    }
    setRole({});
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name Role</Form.Label>
              <Form.Control
              value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter email"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};
RoleModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setName: PropTypes.func,
  role: PropTypes.object,
  setRole: PropTypes.func,
  fetchAllRole: PropTypes.func,
};
export default RoleModal;
