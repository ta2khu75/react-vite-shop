import { Button } from "react-bootstrap";
import RoleModal from "./RoleModal";
import RoleTable from "./RoleTable";
import { useEffect, useState } from "react";
import { getAllRole } from "../../../services/role.service";
import RoleConfirm from "./RoleConfirm";

const Role = () => {
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  useEffect(() => {
    fetchAllRole();
  }, []);
  const fetchAllRole = async () => {
    setRoles(await getAllRole());
  };
//   const handleShow = () => {
//     setShow(true);
//   };
  const handleConfirm = (role) => {
    setConfirm(true);
    setRole(role)
  };
  const handleEdit=(role)=>{
    setShow(true);
    setRole(role)
  }
    const handleCreateRole = () => {
    //  setRole({});
      setShow(true)
    };
  //   const handleUpdateRole=async ()=>{
  //     try {
  //         const data=await update
  //     } catch (error) {

  //     }
  //   }
  return (
    <div className="w-100">
      <Button variant="primary" onClick={handleCreateRole}>
        Create Role
      </Button>
      <RoleModal
        setShow={setShow}
        show={show}
        role={role}
        setRole={setRole}
        fetchAllRole={fetchAllRole}
      />
      <RoleTable setRole={handleEdit} handleConfirm={handleConfirm} roles={roles} />
      <RoleConfirm show={confirm} role={role} setRole={setRole} setShow={setConfirm} fetchAllRole={fetchAllRole} />
    </div>
  );
};
export default Role;
