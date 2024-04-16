import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { deleteRole } from "../../../services/role.service";
import { toast } from "react-toastify";
const RoleConfirm = ({ show, setShow, role, setRole, fetchAllRole }) => {
  const handleClose = () => {
    setShow(false), setRole({});
  };
  const handleDelete = async () => {
    try {
      const data = await deleteRole(role.id);
      toast.success(data.message);
      setRole({})
      setShow(false);
      fetchAllRole();
    } catch (error) {
      toast.error(error.message);
    }
  };
  //const handleShow = () => setShow(true);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want delete role: {role.name}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
RoleConfirm.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.string,
  role: PropTypes.object,
  setRole: PropTypes.func,
  fetchAllRole: PropTypes.func
};
export default RoleConfirm;
