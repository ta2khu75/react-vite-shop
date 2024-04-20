import { Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";

const TableComponent = ({
  titles,
  items,
  handleEdit,
  handleConfirm,
  bool,
  boolTrue,
  boolFalse,
  view,
  handleView
}) => {
  function isBlobURL(url) {
    url += "";
    return url.startsWith("blob:");
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {titles.map((title) => {
            if(title==="IMAGEURL")return;
            return(
            <th key={title}>{title}</th>
          )})}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          const values = Object.values(item);
          return (
            <tr key={index}>
              {values.map((value, index) => {
                if (bool) {
                  if (typeof value === "boolean") {
                    return <td key={index}>{value ? boolTrue : boolFalse}</td>;
                  } else if (isBlobURL(value)) {
                    return
                  } else if(typeof value === "object")return <td key={index}>{value?.name}</td>;
                }else if(isBlobURL(value)) return;
                else if(typeof value === "object")return <td key={index}>{value?.name}</td>;
                
                return <td key={value}>{value}</td>;
              })}
              <td className="d-flex justify-content-center">
                {view &&<Button
                  variant="success"
                  onClick={() => handleView(item)}
                  className=""
                >
                  View
                </Button>}
               
                <Button
                  variant="warning"
                  onClick={() => handleEdit(item)}
                  className="mx-4"
                >
                  Edit
                </Button>
                <Button onClick={() => handleConfirm(item)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
TableComponent.propTypes = {
  titles: PropTypes.array,
  items: PropTypes.array,
  handleEdit: PropTypes.func,
  handleConfirm: PropTypes.func,
  bool: PropTypes.bool,
  boolTrue: PropTypes.string,
  boolFalse: PropTypes.string,
  view: PropTypes.bool,
  handleView: PropTypes.func,

};
export default TableComponent;
