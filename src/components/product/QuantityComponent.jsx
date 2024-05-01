import { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart, setInit } from "../../redux/slice/shoppingCardSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const QuantityComponent = ({ price, id, user, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productDetails: id,
        quantity,
        product,
        seller: user.id,
      })
    );
    toast.info("Added to Shopping cart");
  };
  useEffect(() => {
    if (!isNaN(price)) {
      const result = quantity * price;
      setTotal(result.toLocaleString("vi-VN"));
      setDisabled(false);
    } else {
      setTotal("Contact"), setDisabled(true);
    }
  }, [quantity, price]);
  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value <= 1000) {
      setQuantity(value);
    }
  };
  return (
    <>
      <h4>
        Shop: <Link to={`user/${user?.name}/${user?.id}`}>{user?.name}</Link>
      </h4>
      <hr />
      <b>Quantity</b>
      <div style={{ width: "120px" }}>
        <InputGroup>
          <Button
            disabled={quantity === 1}
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </Button>
          <Form.Control
            width={"40px"}
            height={"32px"}
            value={quantity}
            onChange={(e) => handleChangeQuantity(e)}
          />
          <Button disabled={disabled} onClick={() => setQuantity(quantity + 1)}>
            +
          </Button>
        </InputGroup>
      </div>
      <b>Total</b>
      <h4>
        <b>
          {total}
          {!disabled && <sup>₫</sup>}
        </b>
      </h4>
      <Button
        className="w-100"
        onClick={() => dispatch(setInit())}
        disabled={disabled}
        variant={"danger"}
      >
        Buy Now
      </Button>
      <Button
        className="w-100"
        onClick={() => handleAddToCart()}
        disabled={disabled}
        variant="outline-primary"
      >
        Add to Card
      </Button>
    </>
  );
};
QuantityComponent.propTypes = {
  price: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  product: PropTypes.number.isRequired,
};
export default QuantityComponent;
