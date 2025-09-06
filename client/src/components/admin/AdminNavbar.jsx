import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  return (
    <div className="border-b border-gray-300/30 flex items-center justify-between px-6 py-10 md:px-10 h-16">
      <Link to="/">
        <img src={assets.logo2} alt="logo" className="w-36 h-auto" />
      </Link>
    </div>
  );
};

export default AdminNavbar;
