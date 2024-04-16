import { Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
const UserTable = ({
  users,
  setUser,
  handleConfirm,
  currentPage,
  setCurrentPage,
  pageCount,
}) => {
  const handlePageClick = async (event) => {
    setCurrentPage(event.selected);
    //await fetchAllUser();
    // const newOffset = event.selected * itemsPerPage % items.length;
    //console.log(`User requested page number ${event.selected}`);
    // setItemOffset(newOffset);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Locked</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.locked?"True":"False"}</td>
                <td>{user.role.name}</td>
                <td>
                  <Button
                    onClick={() => setUser(user)}
                    className="mx-2"
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleConfirm(user)}
                    className="mx-2"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
    </>
  );
};
UserTable.propTypes = {
  users: PropTypes.array,
  setUser: PropTypes.func,
  handleConfirm: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  pageCount: PropTypes.number,
};
export default UserTable;
