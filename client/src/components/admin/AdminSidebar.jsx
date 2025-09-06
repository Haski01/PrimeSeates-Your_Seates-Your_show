import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  // admin details
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Show", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Show", path: "/admin/list-shows", icon: ListIcon },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <div className="h-[cal(100vh-64px)] md:flex flex-col items-center pt-8 max-w-35 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
      <img
        className="size-9 md:size-14 rounded-full mx-auto flex"
        src={user.imageUrl}
        alt="admiProfilePictureSidebar"
      />
      <p className="mt-2 text-base max-md:hidden">
        {user.firstName} {user.lastName}
      </p>

      <div className="w-full">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 text-gray-400 hover:bg-primary/15 ${isActive && "bg-primary/15 text-primary group:"}`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon />
                <p>{link.name}</p>
                <span
                  className={`w-1.5 h-10 rounded-1 right-0 absolute ${
                    isActive && "bg-primary"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
