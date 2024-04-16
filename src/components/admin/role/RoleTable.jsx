import { Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";
const RoleTable = ({ roles, setRole, handleConfirm }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => {
          return (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td><Button onClick={()=>setRole(role)} className="mx-2" variant="warning">Edit</Button><Button onClick={()=>handleConfirm(role)}  className="mx-2" variant="danger">Delete</Button></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
RoleTable.propTypes = {
  roles: PropTypes.array,
  setRole: PropTypes.func,
  handleConfirm: PropTypes.func
};
export default RoleTable;
