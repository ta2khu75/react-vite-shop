import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import CarouselContainer from "./CarouselContainer";
import ProductList from "./ProductList";
import { getAllCategory, getImageCategory } from "../services/category.service";
import { useEffect, useState } from "react";
import { getAllProducts, getProductImage } from "../services/product.service";
import Category from "./Category";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchAllCategory();
    fetchAllProducts();
  }, []);
  const fetchAllProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(
        await Promise.all(
          data.map(async (product) => {
            const imageUrl = await getProductImage(product.thumbnail);
            return { ...product, imageUrl }; //...(imageUrl?{thumbnail:imageUrl}:{}) };
          })
        )
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchAllCategory = async () => {
    try {
      const data = await getAllCategory();
      setCategories(
        await Promise.all(
          data.map(async (category) => {
            const imageUrl = await fetchCategoryImage(category);
            return { ...category, imageUrl };
          })
        )
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchCategoryImage = async (category) => {
    try {
      const response = await getImageCategory(category.image);
      return URL.createObjectURL(response);
    } catch (error) {
      return null;
    }
  };
  return (
    <>
      <div className="d-flex">
        <Sidebar>
          <Menu
            menuItemStyles={{
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                component={<Link to={`/category/${category.id}`} />}
              >
                {" "}
                <Category name={category.name} image={category.imageUrl} />
              </MenuItem>
            ))}
          </Menu>
        </Sidebar>
        <div>
          <CarouselContainer />
          <ProductList products={products} />
        </div>
      </div>
    </>
  );
};
export default Home;
