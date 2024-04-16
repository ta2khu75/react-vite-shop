import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
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
        <MenuItem> Pie charts </MenuItem>
        <MenuItem> Line charts </MenuItem>
        <SubMenu label="E-commerce">
          <MenuItem component={<Link to="/admin/role" />}>Role</MenuItem>
          <MenuItem component={<Link to="/admin/category" />}>Category</MenuItem>
          <MenuItem component={<Link to="/admin/user" />}> User</MenuItem>
          <MenuItem component={<Link to="/admin/product" />}> Product</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};
export default AdminHeader;
