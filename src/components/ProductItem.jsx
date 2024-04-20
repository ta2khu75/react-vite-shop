import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
const ProductItem = ({product}) => {
  return (
    <Link to={`product/${product.id}`}>
      <Card style={{ width: "100%" }} className="mb-4">
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body className="d-flex justify-content-center">
          <Card.Title className="nav-link">{product.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};
ProductItem.propTypes={
  product: PropTypes.object
}
export default ProductItem;
