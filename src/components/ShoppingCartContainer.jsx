// import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Button, Form, Image, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../services/user.service";
import { getProduct, getProductImage } from "../services/product.service";
import { getProductDetails } from "../services/productDetails.service";
import {
  decrementCart,
  incrementCart,
  setCart,
} from "../redux/slice/shoppingCardSlice";

const ShoppingCartComponent = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const dispatch = useDispatch();
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    fetchAllCart();
  }, shoppingCart);
  const fetchAllCart = async () => {
    const sellerList = [];
    for (let sell in shoppingCart) {
      const seller = await getUserById(sell);
      seller.product = [];
      for (let prod in shoppingCart[sell]) {
        const data = await getProduct(prod);
        const imageUrl = await getProductImage(data.thumbnail);
        const product = { ...data, imageUrl, productDetails: [] };
        for (let prodDetails in shoppingCart[sell][prod]) {
          const productDetails = {
            ...(await getProductDetails(prodDetails)),
            quantity: shoppingCart[sell][prod][prodDetails],
          };
          product.productDetails.push(productDetails);
        }
        seller.product.push(product);
      }
      sellerList.push(seller);
    }
    setSellers(sellerList);
  };
  return (
    <>
      <Table bordered hover>
        <thead>
          <tr>
            <th
              width={"40px"}
              className="d-flex justify-content-center align-item"
            >
              <Form.Check type="checkbox" />
            </th>
            <th>All (1 product)</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Into money</th>
            <th>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </th>
          </tr>
        </thead>
        {sellers.map((seller) => {
          const sell = shoppingCart[`${seller.id}`];
          return (
            sell && (
              <>
                <div className="mt-3 mb-3"></div>
                <tbody key={`cart-seller-${seller.id}`}>
                  <tr>
                    <td
                      width={"40px"}
                      className="d-flex justify-content-center"
                    >
                      <Form.Check type="checkbox" />
                    </td>
                    <td colSpan={5}>
                      <div className="d-flex align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                        <span className="ms-2">{seller.name}</span>
                      </div>
                    </td>
                  </tr>
                  {seller.product.map((product) => {
                    const prod = shoppingCart[`${seller.id}`][`${product.id}`];
                    return (
                      prod && (
                        <>
                          {product.productDetails.map((productDetails) => {
                            const quantity =
                              shoppingCart[`${seller.id}`][`${product.id}`][
                                `${productDetails.id}`
                              ];
                            return (
                              quantity && (
                                <tr
                                  key={`cart-productDetails-${productDetails.id}`}
                                >
                                  <td
                                    width={"40px"}
                                    style={{
                                      textAlign: "center",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <Form.Check type="checkbox" />
                                  </td>
                                  <td>
                                    <div className="d-flex">
                                      <Image
                                        width={"80px"}
                                        height={"80px"}
                                        src={product.imageUrl}
                                      />
                                      <div className="ms-4">{product.name}</div>
                                    </div>
                                  </td>
                                  <td>
                                    {(productDetails.price * 1).toLocaleString(
                                      "vi-VN"
                                    )}
                                  </td>
                                  <td width={"150px"}>
                                    <InputGroup>
                                      <Button
                                        onClick={() =>
                                          dispatch(
                                            decrementCart({
                                              product: product.id,
                                              seller: seller.id,
                                              productDetails: productDetails.id,
                                            })
                                          )
                                        }
                                      >
                                        -
                                      </Button>
                                      <Form.Control
                                        width={"40px"}
                                        height={"32px"}
                                        value={quantity}
                                        onChange={(e) =>
                                          dispatch(
                                            setCart({
                                              product: product.id,
                                              seller: seller.id,
                                              productDetails: productDetails.id,
                                              quantity: e.target.value,
                                            })
                                          )
                                        }
                                      />
                                      <Button
                                        onClick={() =>
                                          dispatch(
                                            incrementCart({
                                              product: product.id,
                                              seller: seller.id,
                                              productDetails: productDetails.id,
                                            })
                                          )
                                        }
                                      >
                                        +
                                      </Button>
                                    </InputGroup>
                                  </td>
                                  <td>
                                    {(
                                      quantity * productDetails.price
                                    ).toLocaleString("vi-VN")}
                                  </td>
                                  <td>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      fill="currentColor"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                  </td>
                                </tr>
                              )
                            );
                          })}
                        </>
                      )
                    );
                  })}
                </tbody>
              </>
            )
          );
        })}
      </Table>
    </>
  );
};
export default ShoppingCartComponent;
