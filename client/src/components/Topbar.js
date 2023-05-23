import React from 'react';
import {  MdOutlineNotifications, MdHelpOutline, MdPersonOutline, MdOutlineSearch } from 'react-icons/md';

function Topbar() {
    return (
        <div className="w-full flex items-center gap-4 bg-slate-50 text-slate-500 h-20 p-4 border-b border-slate-200">
            <form className='grow'>   
                <label htmlFor="search" className="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white">Search</label>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <MdOutlineSearch className="icon-md" />
                    </div>
                    <input type="search" id="search" className="w-full block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded" placeholder="Search" required />
                </div>
            </form>

            <div className='flex flex-row gap-4'>
                <MdOutlineNotifications className="icon-md" />
                <MdHelpOutline className="icon-md" />
                <MdPersonOutline className="icon-md" />
            </div>
        </div>
    );
}

export default Topbar;