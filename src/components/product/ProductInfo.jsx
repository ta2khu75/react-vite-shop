import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import plus from "../../assets/plus.png";
import { useEffect, useState } from "react";
import {
  createSize,
  deleteSize,
  getAllProductSizes,
  updateSize,
} from "../../services/size.service";
import {
  createOption,
  deleteOption,
  getAllProductOptions,
  updateOption,
} from "../../services/option.service";
import { Button, Form, Image, OverlayTrigger, Popover } from "react-bootstrap";
import FormNameComponent from "../admin/FormNameComponent";
import { toast } from "react-toastify";
import ModalComponent from "../admin/ModalComponent";
import ProductDetailsForm from "../admin/product/ProductDetailsForm";
import { getAllProductDetails } from "../../services/productDetails.service";
const ProductInfo = ({ product, category, name, edit }) => {
  const [childId, setChildId] = useState(undefined);
  const [childName, setChildName] = useState("");
  const [child, setChild] = useState({});
  const [sizes, setSizes] = useState([]);
  const [showSize, setShowSize] = useState(false);
  const [options, setOptions] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [sizeId, setSizeId] = useState(null);
  const [optionId, setOptionId] = useState(null);
  const [showProductDetails, setShowProductDetails]=useState(false);
  const [productDetails, setProductDetails]=useState([]);
  const [price, setPrice] = useState("");
  const [productDetailsId, setProductDetailsId] = useState(undefined);
  useEffect(() => {
    fetchAllProductDetails();
    fetchAllProductOptions();
    fetchAllProductSizes();
  }, [product.id]);
  useEffect(() => {
    setChildId(child.id);
    setChildName(child.name);
  }, [child]);
  useEffect(() => {
    const result = productDetails.find(
      (productDetail) =>
        productDetail.size.id == sizeId && productDetail.option.id == optionId
    );
    setPrice(result?.price);
    setProductDetailsId(result?.id);
  },[sizeId, optionId])
  const fetchAllProductSizes = async () => {
    const data = await getAllProductSizes(product.id);
    setSizes(data);
  };
  const fetchAllProductOptions = async () => {
    const data = await getAllProductOptions(product.id);
    setOptions(data);
  };
  const fetchAllProductDetails=async ()=>{
    const data=await getAllProductDetails(product.id);
    setProductDetails(data);
  }
  const handleSubmitOption = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (childId === undefined) {
        data = await createOption(product.id, childName);
      } else {
        data = await updateOption(childId, product.id, childName);
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
      if (childId === undefined) {
        data = await createSize(product.id, childName);
      } else {
        data = await updateSize(childId, product.id, childName);
      }
      toast.success(data.message);
      fetchAllProductSizes();
      setChild({});
      setShowSize(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDeleteOption = async () => {
    try {
      const data = await deleteOption(childId);
      toast.success(data.message);
      fetchAllProductOptions();
      setChild({});
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDeleteSize = async () => {
    try {
      const data = await deleteSize(childId);
      toast.success(data.message);
      fetchAllProductSizes();
      setChild({});
      // setShowOption(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const popoverOption = (
    <Popover id="popover-option">
      <Popover.Body>
        <Button
          variant="warning"
          className="me-2"
          onClick={() => setShowOption(true)}
        >
          Update
        </Button>
        <Button
          variant="danger"
          className="ms-2"
          onClick={() => handleDeleteOption()}
        >
          Delete
        </Button>
      </Popover.Body>
    </Popover>
  );
  const popoverSize = (
    <Popover id="popover-size">
      <Popover.Body>
        <Button
          variant="warning"
          className="me-2"
          onClick={() => setShowSize(true)}
        >
          Update
        </Button>
        <Button
          variant="danger"
          className="ms-2"
          onClick={() => handleDeleteSize()}
        >
          Delete
        </Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <p>
        Category: <Link to={`category/${category?.id}`}>{category?.name}</Link>
      </p>
      <h3>{product.name ? product.name : name}</h3>
      <div className="mb-2">
        <span>
          <b>Option</b>
        </span>
        <div className="d-flex">
          {edit &&
            options.map((option) => (
              <OverlayTrigger
                key={`option-${option.id}`}
                trigger="click"
                rootClose
                placement="top-start"
                overlay={popoverOption}
              >
                <Button
                  onClick={() => setChildId(option.id)}
                  variant="outline-primary me-2"
                >
                  {option.name}
                </Button>
              </OverlayTrigger>
            ))}
          {!edit &&
            options.map((option) => (
              <Form.Check
                key={`option-${option.id}`}
                className={`btn-outline-primary btn ${
                  optionId == option.id ? "active" : ""
                }`}
                hidden
                inline
                label={option.name}
                name="option"
                type="radio"
                id={`option-${option.id}`}
                value={option.id}
                onChange={(e) => setOptionId(e.target.value)}
              />
            ))}
          {edit && product.id && (
            <Button
              className="d-flex align-items-center justify-content-center"
              variant="outline-success"
              onClick={() => setShowOption(true)}
            >
              <Image width={"20px"} src={plus} />
            </Button>
          )}
        </div>
      </div>
      <div className="mt-2">
        <span>
          <b>Size</b>
        </span>
        <div className="d-flex">
          {edit &&
            sizes.map((size) => (
              <OverlayTrigger
                key={`size-${size.id}`}
                trigger="click"
                rootClose
                placement="bottom-start"
                overlay={popoverSize}
              >
                <Button
                  onClick={() => setChildId(size.id)}
                  variant="outline-primary me-2"
                >
                  {size.name}
                </Button>
              </OverlayTrigger>
            ))}
          {!edit &&
            sizes.map((size) => (
              <Form.Check
                key={`size-${size.id}`}
                className={`btn-outline-primary btn ${
                  sizeId == size.id ? "active" : ""
                }`}
                hidden
                inline
                label={size.name}
                name="size"
                type="radio"
                id={`size-${size.id}`}
                value={size.id}
                onChange={(e) => setSizeId(e.target.value)}
              />
            ))}
          {edit && product.id && (
            <Button
              className="d-flex align-items-center justify-content-center"
              variant="outline-success"
              onClick={() => setShowSize(true)}
            >
              <Image width={"20px"} src={plus} />
            </Button>
          )}
        </div>
      </div>
      <div className="d-flex mt-4">
          <h3 className="me-4">
            <b>
              {price}<sup>₫</sup>
            </b>
          </h3>
          {edit && (
            <Button
              className="d-flex align-items-center justify-content-center"
              variant="outline-success"
              onClick={() => setShowProductDetails(true)}
            >
              <Image width={"20px"} src={plus} />
            </Button>
          )}
        </div>
      <ModalComponent component={<ProductDetailsForm sizes={sizes} options={options} productId={product.id} />} show={showProductDetails} setShow={setShowProductDetails}/>
      <FormNameComponent
        handleSubmit={handleSubmitSize}
        name={childName}
        setName={setChildName}
        show={showSize}
        title={"Size"}
        setShow={setShowSize}
      />
      <FormNameComponent
        handleSubmit={handleSubmitOption}
        name={childName}
        setName={setChildName}
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
  edit: PropTypes.bool,
};
export default ProductInfo;
