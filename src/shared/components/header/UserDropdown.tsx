import { useState } from "react";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";
// import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router";
import { Dropdown } from "../dropdown/Dropdown";
import { DropdownItem } from "../dropdown/DropdownItem";
import { LogOut, User2 } from "lucide-react";

export default function UserDropdown({onClick}: {onClick: () => void}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700  dropdown-toggle dark:text-DarkText"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="https://static.wikitide.net/deathbattlewiki/1/10/Portrait.satorugojo.png" alt="User" />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">Satoru Gojo</span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] dark:bg-[#181926] dark:text-DarkText flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-DarkText">
            Satoru Gojo
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-DarkText">
            satorugojo@gmail.com
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
         
       
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-DarkText dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
             <User2/>
              Profile
            </DropdownItem>
          </li>
        </ul>
        <Link
          to="/login"
          onClick={onClick}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
             <LogOut className="text-DarkText" />
          log out
        </Link>
      </Dropdown>
    </div>
  );
}
