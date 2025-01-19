import Image from "next/image";
import React from "react";
import { useState } from "react";
import ModalDialog from "@/app/modals/Modal";
import { AuthorizedUser } from "@/interfaces/user.interface";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@radix-ui/themes";
import { CgProfile } from "react-icons/cg";

interface NavBarProps {
  user: AuthorizedUser | null;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  const { logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Vocabulous</h1>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsSettingsModalOpen(!isSettingsModalOpen)}
      >
        {user?.picture ? (
          <Image
            src={user.picture}
            alt={`${user.firstName}'s profile`}
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
            referrerPolicy="no-referrer"
          />
        ) : (
          <CgProfile size={25} />
        )}
        <h3>{user?.firstName}</h3>
        {isSettingsModalOpen ? (
          <ModalDialog title="User" open={isSettingsModalOpen} setOpen={setIsSettingsModalOpen}>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user?.firstName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => {
                logout();
                setIsSettingsModalOpen(false);
              }}
            >
              Logout
            </Button>
          </ModalDialog>
        ) : null}
      </div>
    </nav>
  );
};
export default NavBar;
