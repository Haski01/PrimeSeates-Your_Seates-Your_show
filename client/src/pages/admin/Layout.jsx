import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const Layout = () => {
  return (
    <>
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 px-4 md:px-10 py-10 h-[calc(100vh-64px)] overflow-y-auto bg-primary ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
