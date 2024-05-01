import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
const TotalMoneyComponent = ({ totalMoney }) => {
  const formattedMoney = (totalMoney).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return (
    <>
      <div className="p-4 mb-3" style={{ background: "#ffffff" }}>
        <div className="d-flex justify-content-between">
          <span>Temporary</span>
          <span>{formattedMoney}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <span>Total Money</span>
          <div className="text-end">
            <span className="fs-4 text-danger">{formattedMoney}</span>
            <p>(Đã bao gồm VAT nếu có)</p>
          </div>
        </div>
      </div>
      <Button variant="danger" className="w-100">
        Buy Now
      </Button>
    </>
  );
};
TotalMoneyComponent.propTypes = {
  totalMoney: PropTypes.number.isRequired,
  //   sellers: PropTypes.object.isRequired,
};
export default TotalMoneyComponent;
