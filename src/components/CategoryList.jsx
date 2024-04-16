import { useState } from "react";
import Category from "./Category";
import PropTypes from "prop-types";
const CategoryList = ({ categories }) => {
  const [number] = useState(new Array(12).fill(null).map((_, index) => index));
  console.log(number);
  return (
    <div className="row">
        {categories.map((category) => (
          <div className="col-2" key={category.id}>
            <Category category={category} />
          </div>
        ))}
    </div>
  );
};
CategoryList.propTypes = {
  categories: PropTypes.array,
};
export default CategoryList;
