import React, { useState } from 'react';
import logo from '../proma-logo.svg';
import ChannelItem from './ChannelItem';
import { FiPlusCircle, FiMoreHorizontal } from 'react-icons/fi';

const initialChannels = [
    { id: 1, name: 'Apple', subchannels: [{ id: 1, name: 'Sub 1'}, { id: 2, name: 'Sub 2'}] },
    { id: 2, name: 'Amazon' },
    { id: 3, name: 'Google' },
    { id: 4, name: 'Microsoft' },
    { id: 5, name: 'Facebook' },
    { id: 6, name: 'Instagram' },
];

function Sidebar({ onSelectChannel }) {
    const [channels, setChannels] = useState(initialChannels);

    const addChannel = () => {
        const newChannelName = window.prompt("Enter new channel name");
    
        // Check if newChannelName is not null, not empty and is unique
        if (newChannelName && newChannelName.trim() !== '' && !channels.some(channel => channel.name === newChannelName)) {
            const newChannel = {
                id: channels.length + 1,
                name: newChannelName,
            };
            setChannels([...channels, newChannel]);
        } else {
            alert('Invalid or duplicate channel name');
        }
    };
    
    const handleDeleteSubchannel = (channelId, subchannelId) => {
        setChannels(prevChannels => {
            return prevChannels.map(channel => {
                if (channel.id === channelId) {
                return {
                    ...channel,
                    subchannels: channel.subchannels.filter(subchannel => subchannel.id !== subchannelId)
                };
                }
                return channel;
            });
        });
    };

    const handleDeleteChannel = (channelId) => {
        setChannels(channels.filter(channel => channel.id !== channelId));
    };

    return (
        <aside className="w-80 bg-slate-900 text-white flex flex-col min-h-screen">
            <div className='flex justify-between items-center h-20 border-b border-slate-700 p-4'>
                <img src={logo} width={100} height={100} alt='Logo' />
            </div>
            <div className="p-4 flex flex-col grow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Workspace</h2>
                    <FiMoreHorizontal className="h-5 w-5 text-slate-400" />
                </div>
                <div className="flex uppercase font-bold text-sm text-slate-300 mb-2">Projects</div>
                <div className="flex flex-col gap-2">
                    {channels.map(channel => (
                        <ChannelItem
                            key={channel.id}
                            channel={channel}
                            handleDeleteSubchannel={handleDeleteSubchannel}
                            handleDeleteChannel={handleDeleteChannel}
                            onSelectChannel={onSelectChannel}
                        />
                    ))}
                </div>
            </div>
            <button className="w-full mt-4 p-6 hover:bg-slate-800 border-t border-slate-700 text-white inline-flex items-center justify-center" onClick={addChannel}>
                <FiPlusCircle className="h-5 w-5 mr-2" />
                Add Channel
            </button>
        </aside>
    );
}

export default Sidebar;