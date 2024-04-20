import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Form} from "react-bootstrap";
import {
  createProductDetails,
  deleteProductDetails,
  getAllProductDetails,
  updateProductDetails,
} from "../../../services/productDetails.service";
import TableComponent from "../TableComponent";
import { toast } from "react-toastify";
const ProductDetailsForm = ({ productId, sizes, options }) => {
  const [optionId, setOptionId] = useState(undefined);
  const [sizeId, setSizeId] = useState(undefined);
  const [price, setPrice] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  // const [productDetail, setProductDetail] = useState({});
  const [id, setId] = useState(undefined);
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    fetchAllProductDetailsProduct();
  }, []);
  useEffect(() => {
    const result = productDetails.find(
      (productDetail) =>
        productDetail?.size?.id == sizeId && productDetail?.option?.id == optionId
    );
    setId(result ? result.id : undefined);
    setPrice(result ? result.price : "");
  }, [sizeId, optionId]);

  const fetchAllProductDetailsProduct = async () => {
    try {
      const data = await getAllProductDetails(productId);
      setTitles(
        data.length > 0
          ? Object.keys(data[0]).map((key) => key.toUpperCase())
          : []
      );
      setProductDetails(data);
    } catch (error) {
      console.error("Error fetching products details:", error);
    }
  };
  const handleChangePrice = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(productId, );
    try {
      let data;
      if (id == undefined) {
        data = await createProductDetails(productId, optionId, sizeId, price);
      } else {
        data = await updateProductDetails(
          id,
          productId,
          optionId,
          sizeId,
          price
        );
      }
      // const data = await createProductDetails(
      //   productId,
      //   optionId,
      //   sizeId,
      //   price
      // );
      toast.success(data.message);
      setOptionId("")
      setSizeId("")
      fetchAllProductDetailsProduct();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEdit = (productDetail) => {
    setSizeId(productDetail.size.id);
    setOptionId(productDetail.option.id);
    // setId(productDetail.id);
  };
  const handleDelete=async(productDetail)=>{
    try {
      const data=await deleteProductDetails(productDetail.id);
      toast.success(data.message);
      fetchAllProductDetailsProduct();
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="row">
      <div className="col-6">
        <div className="mb-2">
          <span>
            <b>Option</b>
          </span>
          <div className="d-flex">
            {options.map((option) => (
              <Form.Check
                key={`option-${option.id}`}
                className={`btn-outline-primary btn ${
                  optionId == option.id ? "active" : ""
                }`}
                // hidden
                inline
                label={option.name}
                name="option"
                type="radio"
                checked={option.id == optionId}
                id={`option-${option.id}`}
                value={option.id}
                onChange={(e) => setOptionId(e.target.value)}
              />
            ))}
          </div>
        </div>
        <div className="mt-2">
          <span>
            <b>Size</b>
          </span>
          <div className="d-flex">
            {sizes.map((size) => (
              <Form.Check
                key={`size-${size.id}`}
                className={`btn-outline-primary btn ${
                  sizeId == size.id ? "active" : ""
                }`}
                // hidden
                inline
                label={size.name}
                name="size"
                type="radio"
                id={`size-${size.id}`}
                checked={size.id == sizeId}
                value={size.id}
                onChange={(e) => setSizeId(e.target.value)}
              />
            ))}
          </div>
        </div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              type="text"
              placeholder="Price"
              onChange={(e) => handleChangePrice(e)}
            />
          </Form.Group>
          <Button variant="primary" className="w-100" type="submit">
            Save
          </Button>
        </Form>
      </div>
      <div className="col-6">
        <TableComponent
          handleEdit={handleEdit}
          titles={titles}
          items={productDetails}
          handleConfirm={handleDelete}
        />
        {/* <Table className="w-100" striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Option</th>
              <th>Size</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {productDetails.map(productDetail=>{
              return(
                <tr key={productDetail.id}>
                  <td>{productDetail.id}</td>
                  <td>{productDetail.option.name}</td>
                  <td>{productDetail.size.name}</td>
                  <td>{productDetail.price}</td>
                </tr>
              )
            })}
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table> */}
      </div>
    </div>
  );
};
ProductDetailsForm.propTypes = {
  productId: PropTypes.string.isRequired,
  sizes: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
};
export default ProductDetailsForm;
