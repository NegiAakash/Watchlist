import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
