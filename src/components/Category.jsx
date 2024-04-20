import { Image } from "react-bootstrap";
import PropTypes from "prop-types"
const Category = ({name, image}) => {
  return (
    <div className="d-flex align-items-center">
      <Image src={image} width={"32px"} className="mx-2" />
      <span className="mx-2">{name}</span>
    </div>
  );
};
Category.propTypes={
    name: PropTypes.string,
    image: PropTypes.object
}
export default Category;
