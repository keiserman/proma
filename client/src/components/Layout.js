import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function Layout({ children }) {
    return (
        <div className="h-screen w-full flex overflow-hidden">
            <Sidebar />
            <div className="flex flex-col w-full overflow-auto">
                <Topbar />
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;