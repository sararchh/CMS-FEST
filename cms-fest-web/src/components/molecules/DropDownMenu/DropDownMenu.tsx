/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import styles from "./DropDownMenu.module.css";
import { AuthContext } from "@/contexts/authContext";
import { FaUser } from 'react-icons/fa';

interface Props {
  title: string;
}

export const DropDownMenu: React.FC<Props> = ({ title }) => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Menu>
      <Menu.Button className={styles["button-title"]}>
        <h3>{title}</h3>
        <FaUser className={styles['user-icon']} />
        <svg
          className="w-4 h-4 shrink-0 ml-1 fill-current text-slate-800"
          viewBox="0 0 12 12"
        >
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-12 top-14 z-10 mt-2 p-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-slate-800 dark:border-slate-400">
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
            <div className="font-medium text-slate-800 dark:text-slate-100">
              {user?.name}
            </div>
            {user?.isAdmin && (
              <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                Administrator
              </div>
            )}
          </div>
          <ul>
            <li>
              <Menu.Item>
                <button
                  className="font-medium text-sm text-red-500 hover:text-red-800 flex items-center py-1 px-3"
                  onClick={signOut}
                >
                  Sair
                </button>
              </Menu.Item>
            </li>
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
