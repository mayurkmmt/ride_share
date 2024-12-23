import React from "react";
import { Lock, Menu, User, Wallet } from "lucide-react";
import { useNavigate } from "react-router";

const UserMenu = () => {
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = React.useState<boolean>(false);

  const toggleUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/");
    toggleUserMenu();
  };

  return (
    <div className="absolute top-4 right-6 z-10" onMouseLeave={toggleUserMenu}>
      <Menu
        strokeWidth={3}
        className="text-white hover:text-theme"
        onMouseEnter={toggleUserMenu}
      />
      {openUserMenu && (
        <div className="h-max w-28 bg-white text-black rounded-xl absolute top-6 right-2 transition-all duration-500 ease-in-out">
          <a
            href="#"
            className="flex items-center gap-2 p-2 pl-4 rounded-t-xl hover:bg-gray-200"
          >
            <User size={14} className="mr-1 text-theme" />
            Profile
          </a>
          <div className="border-b" />
          <a
            href="#"
            className="flex items-center gap-2 p-2 pl-4 hover:bg-gray-200"
          >
            <Wallet size={14} className="mr-1 text-theme" />
            Wallet
          </a>
          <div className="border-b" />
          <a
            href="#"
            className="flex items-center gap-2 p-2 pl-4 rounded-b-xl hover:bg-gray-200"
            onClick={logout}
          >
            <Lock size={14} className="mr-1 text-theme" />
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
