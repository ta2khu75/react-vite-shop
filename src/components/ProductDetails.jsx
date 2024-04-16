import { Button, Form, Image, OverlayTrigger, Popover } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ProductInfo from "./product/ProductInfo";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import defaultImageUrl from "../assets/plus.png";
import {
  addProductImage,
  deleteProductImage,
  getAllProductImages,
  getProductimage,
  updateProductImage,
} from "../services/productImage.service";
import { toast } from "react-toastify";
const ProductDetails = ({ product, imageUrl, name, category }) => {
  
  const [productImages, setProductImages] = useState([]);
  const [idProductImage, setIdProductImage] = useState([]);
  useEffect(() => {
    fetchAllProductImages();
  }, [product]);
  const handleAddImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const data = await addProductImage(product.id, e.target.files[0]);
        fetchAllProductImages();
        toast.success(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleUpdateImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const data = await updateProductImage(idProductImage, product.id, e.target.files[0]);
        fetchAllProductImages();
        toast.success(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
  const handleDeleteImage = async () => {
    try {
        const data = await deleteProductImage(idProductImage);
        fetchAllProductImages();
        toast.success(data.message);
      } catch (error) {
        toast.error(error.message);
      }
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Button variant="outline-danger" onClick={handleDeleteImage} className="mb-2">Delete</Button>
        <Form.Group
          controlId="formBasicUpdate"
        >
          <Form.Label className="mt-2 btn btn-outline-warning">
            Update
          </Form.Label>
          <Form.Control onChange={(e)=>handleUpdateImage(e)} type="file" hidden />
        </Form.Group>
      </Popover.Body>
    </Popover>
  );
  const fetchAllProductImages = async () => {
    try {
      const data = await getAllProductImages(product.id);
      setProductImages(
        await Promise.all(
          data.map(async (productImage) => {
            const imageUrl = await getProductimage(
              productImage.productId,
              productImage.image
            );
            return { ...productImage, imageUrl };
          })
        )
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="row">
      <div className="col-4">
        <Card style={{ width: "100%" }}>
          <Card.Img
            variant="top"
            src={product.imageUrl ? product.imageUrl : imageUrl}
          />
          <Card.Body>
            <div className="row">
              {productImages.map((t) => {
                console.log(t.imageUrl);
                return (
                  <OverlayTrigger
                    key={t.id}
                    rootClose
                    trigger="click"
                    placement="right"
                    overlay={popover}
                  >
                    <Image
                      onClick={()=>setIdProductImage(t.id)}
                      thumbnail
                      className="col-2"
                      width={"100%"}
                      src={t.imageUrl}
                    />
                  </OverlayTrigger>
                );
              })}
              {productImages.length < 6 && product.id && (
                <Form.Group
                  className="col-2 btn btn-outline-success"
                  controlId="formBasicP>}assword"
                >
                  <Form.Label>
                    <Image
                      key="defaultImage"
                      width={"100%"}
                      src={defaultImageUrl}
                    />
                  </Form.Label>
                  <Form.Control type="file" onChange={handleAddImage} hidden />
                </Form.Group>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="col-6">
        <ProductInfo category={category} name={name} product={product} />
      </div>
      <div className="col-3"></div>
    </div>
  );
};
ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
export default ProductDetails;
