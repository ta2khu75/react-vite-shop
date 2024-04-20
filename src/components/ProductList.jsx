import ProductItem from "./ProductItem";
import PropTypes from "prop-types";
const ProductList = ({ products }) => {
  return (
    <div className="row">
        {products.map((product) => (
          <div className="col-2" key={`product-item-${product.id}`}>
            <ProductItem product={product} />
          </div>
        ))}
    </div>
  );
};
ProductList.propTypes = {
  products: PropTypes.array,
};
export default ProductList;
