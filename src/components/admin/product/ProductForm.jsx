import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  createProduct,
  updateProduct,
} from "../../../services/product.service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
const ProductForm = ({ product, setProduct, setImageUrl, categories, name, setName, categoryId, setCategoryId, fetchAllProducts }) => {
  const [id, setId] = useState(undefined);
  const [thumbnail, setThumbnail] = useState();
  const [active, setActive] = useState(true);
  useEffect(() => {
    setId(product.id);
    setName(product.name);
    setThumbnail(product.thumbnail);
    setCategoryId(product.categoryId?product.categoryId:"");
    setActive(product.active===undefined?true:product.active);
    setImageUrl(product.imageUrl);
  }, [product]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (id === undefined) {
        data = await createProduct(categoryId, name, thumbnail, active);
      } else {
        data = await updateProduct(id, categoryId, name, thumbnail, active);
      }
      toast.success(data.message);
      setProduct({})
      fetchAllProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };
  return (
    <Form onSubmit={(e)=>handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={categoryId}
          required
          onChange={(e) => setCategoryId(e.target.value)}
          aria-label="Default select example"
        >
          <option value="">Choose category for product</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Is Active:</Form.Label>
        <div className="d-flex justify-content-between">
          <Form.Group controlId="formBasicActive">
            <Form.Check
              type="radio"
              label="Active"
              name="active"
              checked={active}
              onChange={() => setActive(true)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicUnActive">
            <Form.Check
              type="radio"
              label="Non Active"
              name="active"
              checked={!active}
              onChange={() => setActive(false)}
            />
          </Form.Group>
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="btn btn-outline-primary">
          Upload Image
        </Form.Label>
        <Form.Control
          type="file"
          //value={thumbnail ? thumbnail : ''}
         // {thumbnail&&value={thumbnail}}
          onChange={(e) => handleUploadImage(e)}
          hidden
        />
      </Form.Group>
      <Button variant="primary" className="mx-2" type="submit">
        Submit
      </Button>
      <Button onClick={()=>setProduct({})} variant="primary" className="mx-2" type="reset">
        Reset
      </Button>
    </Form>
  );
};
ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  setProduct: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired,
  setCategoryId: PropTypes.func.isRequired,
  fetchAllProducts: PropTypes.func.isRequired
};
export default ProductForm;
