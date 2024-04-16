import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
const Category = ({category}) => {
  return (
    <Link to={`category/${category.id}`}>
      <Card style={{ width: "100%" }} className="mb-4">
        <Card.Img variant="top" src={category.imageUrl} />
        <Card.Body className="d-flex justify-content-center">
          <Card.Title className="nav-link">{category.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};
Category.propTypes={
  category: PropTypes.object
}
export default Category;
