import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ChannelDetails from './ChannelDetails';

function Layout() {

    const [selectedChannel, setSelectedChannel] = useState(null);

    const handleSelectChannel = (channel) => {
        setSelectedChannel(channel);
    }
    
    return (
        <div className="flex">
            <Sidebar onSelectChannel={handleSelectChannel} />
            <div className="flex-grow">
                <Topbar />
                <ChannelDetails channel={selectedChannel} />
            </div>
        </div>
  );
    
}

export default Layout;