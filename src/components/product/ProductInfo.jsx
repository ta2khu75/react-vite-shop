import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import plus from "../../assets/plus.png";
import { useEffect, useState } from "react";
import {
  createSize,
  getAllProductSizes,
  updateSize,
} from "../../services/size.service";
import {
  createOption,
  getAllProductOptions,
  updateOption,
} from "../../services/option.service";
import { Button, Form, Image } from "react-bootstrap";
import FormNameComponent from "../admin/FormNameComponent";
import { toast } from "react-toastify";
const ProductInfo = ({ product, category, name }) => {
  const [idChild, setIdChild] = useState(undefined);
  const [nameChild, setNameChild] = useState("");
  const [child, setChild] = useState({});
  const [sizes, setSizes] = useState([]);
  const [showSize, setShowSize] = useState(false);
  const [options, setOptions] = useState([]);
  const [showOption, setShowOption] = useState(false);
  useEffect(() => {
    fetchAllProductOptions();
    fetchAllProductSizes();
  }, [product]);
  useEffect(() => {
    setIdChild(child.id);
    setNameChild(child.name);
  }, [child]);
  const fetchAllProductSizes = async () => {
    const data = await getAllProductSizes(product.id);
    setSizes(data);
  };
  const fetchAllProductOptions = async () => {
    const data = await getAllProductOptions(product.id);
    setOptions(data);
  };
  const handleSubmitOption = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (idChild === undefined) {
        data = await createOption(product.id, nameChild);
      } else {
        data = await updateOption(idChild, product.id, nameChild);
      }
      toast.success(data.message);
      fetchAllProductOptions();
      setChild({});
      setShowOption(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSubmitSize = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (idChild === undefined) {
        data = await createSize(product.id, nameChild);
      } else {
        data = await updateSize(idChild, product.id, nameChild);
      }
      toast.success(data.message);
      fetchAllProductSizes();
      setChild({});
      setShowSize(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <p>
        Category:{" "}
        <Link to={"category/id"}>
          {product.category ? product.category?.name : category?.name}
        </Link>
      </p>
      <h3>{product.name ? product.name : name}</h3>
      <div className="mb-2">
        <span>
          <b>Option</b>
        </span>
        <div className="d-flex">
          {options.map((option) => (
            <Form.Group key={`option-${option.id}`} controlId="formBasic">
              <Form.Check
                type="radio"
                name="option"
                className="me-2 btn btn-outline-primary"
                hidden
                label={option.name}
              />
            </Form.Group>
          ))}
          <Button onClick={() => setShowOption(true)}>
            <Image width={"16px"} src={plus} />
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <span>
          <b>Size</b>
        </span>
        <div className="d-flex">
          {sizes.map((size) => (
            <Form.Group key={`size-${size.id}`} controlId="formBasic">
              <Form.Check
                type="radio"
                name="size"
                className="me-2 btn btn-outline-primary"
                hidden
                label={size.name}
              />
            </Form.Group>
          ))}
          <Button onClick={() => setShowSize(true)}>
            <Image width={"16px"} src={plus} />
          </Button>
        </div>
      </div>
      <FormNameComponent
        handleSubmit={handleSubmitSize}
        name={nameChild}
        setName={setNameChild}
        show={showSize}
        title={"Size"}
        setShow={setShowSize}
      />
      <FormNameComponent
        handleSubmit={handleSubmitOption}
        name={nameChild}
        setName={setNameChild}
        show={showOption}
        title={"Option"}
        setShow={setShowOption}
      />
    </>
  );
};
ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
export default ProductInfo;
