import { Button } from "react-bootstrap";
// import UserTable from "./UserTable";
import { useEffect, useState } from "react";
import { getPageUser } from "../../../services/user.service";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import _ from "lodash";
import UserConfirm from "./UserConfirm";
const User = () => {
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const SIZE = 5;
  useEffect(() => {
    fetchPageUser(currentPage);
  }, [currentPage]);
  const fetchPageUser = async (currentPage) => {
    const data = await getPageUser(currentPage, SIZE);
    console.log(data);
    if (_.isEmpty(data.paginate)) {
      setCurrentPage(currentPage === 0 ? currentPage : currentPage - 1);
      return;
    }
    setPageCount(data.pageCount);
    setUsers(data.paginate);
  };
  const handleConfirm = (user) => {
    setConfirm(true);
    setUser(user);
  };
  const handleEdit = (user) => {
    setShow(true);
    setUser(user);
  };
  const handleCreateUser = () => {
    setShow(true);
  };
  return (
    <div className="w-100">
      <Button variant="primary" onClick={handleCreateUser}>
        Create User
      </Button>
      <UserForm
        setShow={setShow}
        show={show}
        user={user}
        setUser={setUser}
        setCurrentPage={setCurrentPage}
        fetchPageUser={fetchPageUser}
      />
      <UserTable
        setUser={handleEdit}
        handleConfirm={handleConfirm}
        users={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
      <UserConfirm
        show={confirm}
        user={user}
        setUser={setUser}
        setShow={setConfirm}
        fetchPageUser={fetchPageUser}
      />
    </div>
  );
};
export default User;
