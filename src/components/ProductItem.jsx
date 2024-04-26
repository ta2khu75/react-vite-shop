import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { getAllProductDetails } from "../services/productDetails.service";
const ProductItem = ({product}) => {
  const [productDetails, setProductDetails]=useState([]);
  const [price, setPrice]=useState("Contact")
  const [priceFormat, setPriceFormat]=useState("Contact");
  useEffect(()=>{fetchAllProductDetails()},[])
  const fetchAllProductDetails=async()=>{
    const data=await getAllProductDetails(product.id);
    setProductDetails(data);
    if(data && data.length>0){
      setPrice((1*data[0].price));
      setPriceFormat((1*data[0].price).toLocaleString("vi-VN"))
    }
  }
  return (
    <Link to={`product/${product.id}`}>
      <Card style={{ width: "100%" }} className="mb-4">
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body className="">
          <div>{product.name}</div>
          <Card.Title><b>{priceFormat}{typeof price == "number"&&<sup>₫</sup>}</b></Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};
ProductItem.propTypes={
  product: PropTypes.object
}
export default ProductItem;
