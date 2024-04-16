import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const Admin = () => {
  return (
    <div className="d-flex">
      <AdminHeader />
      <Outlet/>
    </div>
  );
};
export default Admin;
