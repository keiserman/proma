import React from "react";
import {
  MdOutlineNotifications,
  MdHelpOutline,
  MdOutlineSearch,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

function Topbar() {
  return (
    <div className="flex items-center gap-4 shadow-sm text-slate-500 p-4 h-16 border-b border-slate-200">
      <form className="grow">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <MdOutlineSearch className="icon-md text-slate-400" />
          </div>
          <input
            type="search"
            id="search"
            className="w-full block p-2 pl-8 text-gray-900 rounded focus:outline-none"
            placeholder="Search..."
            required
          />
        </div>
      </form>

      <div className="flex flex-row gap-4 items-center text-slate-500">
        <MdOutlineNotifications className="icon-md" />
        <MdHelpOutline className="icon-md" />
        <div className="w-px bg-slate-200 h-5"></div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-slate-400"></div>
          <MdOutlineKeyboardArrowDown className="icon-sm" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
