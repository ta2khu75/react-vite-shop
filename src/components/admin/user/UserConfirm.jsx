import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { deleteUser } from "../../../services/user.service";
import { toast } from "react-toastify";
const UserConfirm = ({ show, setShow, user, setUser, fetchPageUser }) => {
  const handleClose = () => {
    setShow(false), setUser({});
  };
  const handleDelete = async () => {
    try {
      const data = await deleteUser(user.id);
      await fetchPageUser();
      toast.success(data.message);
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };
  //const handleShow = () => setShow(true);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want delete user: {user.name}</Modal.Body>
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
UserConfirm.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
  fetchPageUser: PropTypes.func,
};
export default UserConfirm;
