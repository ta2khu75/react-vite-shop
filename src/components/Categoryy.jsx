import { Image } from "react-bootstrap";
import logo from "../assets/react.svg";
import PropTypes from "prop-types"
const Categoryy = ({name, image}) => {
  return (
    <div className="d-flex align-items-center">
      <Image src={image} width={"32px"} className="mx-2" />
      <span className="mx-2">{name}</span>
    </div>
  );
};
Categoryy.propTypes={
    name: PropTypes.string,
    image: PropTypes.object
}
export default Categoryy;
