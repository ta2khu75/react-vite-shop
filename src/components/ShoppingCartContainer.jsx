// import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Button, Form, Image, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../services/user.service";
import { getProduct, getProductImage } from "../services/product.service";
import { getProductDetails } from "../services/productDetails.service";
import empty from "../assets/6c0f335100e0d9fab8e8736d6d2fbcad.png";
import {
  checkCart,
  checkSeller,
  decrementCart,
  incrementCart,
  removeFromCart,
  setCart,
  setCheckAll,
} from "../redux/slice/shoppingCardSlice";
import TotalMoneyComponent from "./TotalMoneyComponent";

const ShoppingCartComponent = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart.value);
  const checkAll = useSelector((state) => state.shoppingCart.checkAll);
  const [totalMoney, setTotalMoney] = useState(0);
  const [numberCart, setNumberCart] = useState(0);
  const [numberCartChecked, setNumberCartChecked] = useState(0);
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    fetchAllCart();
  }, []);
  useEffect(() => {
    countCart();
    countCartChecked();
    calculatorAllCartTrue();
  }, [JSON.stringify(shoppingCart)]);
  const countCart = () => {
    let totalCount = 0;
    if (!Object.keys(shoppingCart).length > 0) return 0;
    for (const seller in shoppingCart) {
      const sellers = shoppingCart[seller];
      for (const product in sellers) {
        totalCount += Object.keys(sellers[product]).length;
      }
    }
    setNumberCart(totalCount);
  };
  const countCartChecked = () => {
    let totalChecked = 0;
    if (!Object.keys(shoppingCart).length > 0) return 0;
    for (const seller in shoppingCart) {
      const sellers = shoppingCart[seller];
      for (const product in sellers) {
        console.log(product);
        if (product == "checked") continue;
        for (const productDetails in sellers[product]) {
          if (sellers[product][productDetails].checked) {
            totalChecked += 1;
          }
        }
      }
    }
    setNumberCartChecked(totalChecked);
  };
  const calculatorAllCartTrue = async () => {
    let money = 0;
    for (const sellerId in shoppingCart) {
      const productIds = shoppingCart[`${sellerId}`];
      for (const productId in productIds) {
        if (productId == "checked") continue;
        const productDetailsIds = productIds[productId];
        for (const productDetailsId in productDetailsIds) {
          const cart = productDetailsIds[`${productDetailsId}`];
          if (cart.checked) {
            const data = await getProductDetails(productDetailsId);
            money += data.price * cart.quantity;
          }
        }
      }
    }
    setTotalMoney(money);
  };
  const fetchAllCart = async () => {
    const sellerList = [];
    for (let sell in shoppingCart) {
      const seller = await getUserById(sell);
      seller.product = [];
      for (let prod in shoppingCart[sell]) {
        if (prod == "checked") continue;
        const data = await getProduct(prod);
        const imageUrl = await getProductImage(data.thumbnail);
        const product = { ...data, imageUrl, productDetails: [] };
        for (let prodDetails in shoppingCart[sell][prod]) {
          const productDetails = await getProductDetails(prodDetails);
          product.productDetails.push(productDetails);
        }
        seller.product.push(product);
      }
      sellerList.push(seller);
    }
    setSellers(sellerList);
  };
  const handleRemoveFromCart = ({ seller, product, productDetails }) => {
    dispatch(removeFromCart({ seller, product, productDetails }));
  };
  return (
    <>
      <h5>
        <b>SHOPPING CART</b>
      </h5>
      {Object.keys(shoppingCart).length > 0 && (
        <div className="d-flex">
          <Table hover className="w-75">
            <thead>
              <tr>
                <th width={"40px"} className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={checkAll}
                    onChange={() => dispatch(setCheckAll(!checkAll))}
                  />
                </th>
                <th>All ({numberCart} product)</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Into money</th>
                <th className="text-center" width={"40px"}>
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
              if (sell == undefined) return;
              const sellerCheck = shoppingCart[`${seller.id}`].checked;
              return (
                sell && (
                  <>
                    <div className="mt-3 mb-3"></div>
                    <tbody key={`cart-seller-${seller.id}`}>
                      <tr height={"40px"}>
                        <td width={"40px"} className="text-center">
                          <Form.Check
                            type="checkbox"
                            checked={sellerCheck}
                            onChange={() =>
                              dispatch(
                                checkSeller({
                                  seller: seller.id,
                                  checked: !sellerCheck,
                                })
                              )
                            }
                          />
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
                        const prod =
                          shoppingCart[`${seller.id}`][`${product.id}`];
                        return (
                          prod && (
                            <>
                              {product.productDetails.map((productDetails) => {
                                if (
                                  shoppingCart[`${seller.id}`][`${product.id}`][
                                    `${productDetails.id}`
                                  ] == undefined
                                )
                                  return;
                                const quantity =
                                  shoppingCart[`${seller.id}`][`${product.id}`][
                                    `${productDetails.id}`
                                  ].quantity;
                                const cartChecked =
                                  shoppingCart[`${seller.id}`][`${product.id}`][
                                    `${productDetails.id}`
                                  ].checked;
                                return (
                                  quantity && (
                                    <tr
                                      key={`cart-productDetails-${productDetails.id}`}
                                    >
                                      <td
                                        width={"40px"}
                                        className="text-center"
                                        style={{
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        <Form.Check
                                          type="checkbox"
                                          checked={cartChecked}
                                          onChange={async () => {
                                            dispatch(
                                              checkCart({
                                                seller: seller.id,
                                                product: product.id,
                                                productDetails:
                                                  productDetails.id,
                                                checked: !cartChecked,
                                              })
                                            );
                                          }}
                                        />
                                      </td>
                                      <td>
                                        <div className="d-flex">
                                          <Image
                                            width={"80px"}
                                            height={"80px"}
                                            src={product.imageUrl}
                                          />
                                          <div className="ms-4">
                                            <div>{product.name}</div>
                                            <div className="text-secondary">
                                              {productDetails.option?.name},{" "}
                                              {productDetails.size?.name}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td
                                        className="text-center"
                                        style={{
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {(
                                          productDetails.price * 1
                                        ).toLocaleString("vi-VN")}
                                      </td>
                                      <td
                                        width={"150px"}
                                        style={{
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        <InputGroup>
                                          <Button
                                            onClick={() =>
                                              dispatch(
                                                decrementCart({
                                                  product: product.id,
                                                  seller: seller.id,
                                                  productDetails:
                                                    productDetails.id,
                                                })
                                              )
                                            }
                                          >
                                            -
                                          </Button>
                                          <Form.Control
                                            className="text-center"
                                            width={"40px"}
                                            height={"32px"}
                                            value={quantity}
                                            onChange={(e) =>
                                              dispatch(
                                                setCart({
                                                  product: product.id,
                                                  seller: seller.id,
                                                  productDetails:
                                                    productDetails.id,
                                                  quantity:
                                                    e.target.value == ""
                                                      ? quantity
                                                      : e.target.value,
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
                                                  productDetails:
                                                    productDetails.id,
                                                })
                                              )
                                            }
                                          >
                                            +
                                          </Button>
                                        </InputGroup>
                                      </td>
                                      <td
                                        className="text-center"
                                        style={{
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {(
                                          quantity * productDetails.price
                                        ).toLocaleString("vi-VN")}
                                      </td>
                                      <td
                                        width={"40px"}
                                        className="text-center"
                                        style={{
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        <svg
                                          onClick={() =>
                                            handleRemoveFromCart({
                                              seller: seller.id,
                                              product: product.id,
                                              productDetails: productDetails.id,
                                            })
                                          }
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
          <div className="w-25 ms-3">
            <TotalMoneyComponent
              numberCartChecked={numberCartChecked}
              totalMoney={totalMoney}
            />
          </div>
        </div>
      )}
      {Object.keys(shoppingCart).length == 0 && (
        <div className="text-center">
          <Image src={empty} />
          <h5>Shopping cart is empty</h5>
          <p>Please refer to the products recommended by Tiki below!</p>
        </div>
      )}
    </>
  );
};
export default ShoppingCartComponent;