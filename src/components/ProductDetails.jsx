import { Image} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ProductInfo from "./product/ProductInfo";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  getAllProductImages,
  getProductImages,
} from "../services/productImage.service";
import { useParams } from "react-router-dom";
import { getProduct, getProductImage } from "../services/product.service";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [productImages, setProductImages] = useState([]);
  
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

  return (
    <div className="row">
      <div className="col-4">
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <Card.Img
              thumbnail
              // width={"368px"}
              // height={"368px"}
              variant="top"
              src={product.imageUrl}
            />
          </Card.Header>
          <Card.Body>
            <div className="row">
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
      <div className="col-8">
        <ProductInfo
          category={product.category}
          name={product.name}
          product={product}
        />
      </div>
    </div>
  );
};
ProductDetails.propTypes = {
  product: PropTypes.object,
  imageUrl: PropTypes.string,
  category: PropTypes.object,
  name: PropTypes.string,
};
export default ProductDetails;
