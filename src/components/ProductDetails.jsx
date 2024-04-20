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
  getProductImages,
  updateProductImage,
} from "../services/productImage.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getProduct, getProductImage } from "../services/product.service";
import Product from "./admin/product/Product";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [idProductImage, setIdProductImage] = useState([]);
  useEffect(() => {
    fetchGetProduct();
  }, []);
  useEffect(() => {
    fetchAllProductImages();
  }, [product.id]);
  const fetchAllProductImages = async () => {
    try {
      const data = await getAllProductImages(product.id);
      setProductImages(
        await Promise.all(
          data.map(async (productImage) => {
            const imageUrl = await getProductImages(
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
  const fetchGetProduct = async () => {
    try {
      const data = await getProduct(id);
      const imageUrl = await getProductImage(data.thumbnail);
      setImageUrl(imageUrl);
      setProduct({ ...data, imageUrl });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
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
        const data = await updateProductImage(
          idProductImage,
          product.id,
          e.target.files[0]
        );
        fetchAllProductImages();
        toast.success(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleDeleteImage = async () => {
    try {
      const data = await deleteProductImage(idProductImage);
      fetchAllProductImages();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Button
          variant="outline-danger"
          onClick={handleDeleteImage}
          className="mb-2"
        >
          Delete
        </Button>
        <Form.Group controlId="formBasicUpdate">
          <Form.Label className="mt-2 btn btn-outline-warning">
            Update
          </Form.Label>
          <Form.Control
            onChange={(e) => handleUpdateImage(e)}
            type="file"
            hidden
          />
        </Form.Group>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="row">
      <div className="col-4">
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <Card.Img
              thumbnail
              width={"368px"}
              height={"368px"}
              variant="top"
              src={product.imageUrl}
            />
          </Card.Header>
          <Card.Body>
            <div className="row">
              {/* {productImages.map((t) => {
                return (
                  <OverlayTrigger
                    key={`product-image-${t.id}`}
                    rootClose
                    trigger="click"
                    placement="right"
                    overlay={popover}
                  >
                    <Image
                      onClick={() => setIdProductImage(t.id)}
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
                  controlId="addImage"
                >
                  <Form.Label>
                    <Image
                      key="defaultImage"
                      width={"100%"}
                      src={defaultImageUrl}
                    />
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleAddImag(e)}
                    hidden
                  />
                </Form.Group>
              )} */}
              {productImages.map((t) => {
                return (
                  <Image
                    key={`product-image-${t.id}`}
                    onMouseEnter={() =>
                      setProduct({ ...product, imageUrl: t.imageUrl })
                    }
                    onMouseLeave={() => setProduct({ ...product, imageUrl })}
                    thumbnail
                    className="col-2"
                    width={"100%"}
                    src={t.imageUrl}
                  />
                );
              })}
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="col-6">
        <ProductInfo
          category={product.category}
          name={product.name}
          product={product}
        />
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
