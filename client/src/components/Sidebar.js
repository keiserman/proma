import React, { useState } from 'react';
import logo from '../proma-logo.svg';
import ChannelItem from './ChannelItem';
import { FiPlusCircle, FiMoreHorizontal } from 'react-icons/fi';

const initialChannels = [
    { id: 1, name: 'Apple', subchannels: [{ id: 1, name: 'Sub 1'}, { id: 2, name: 'Sub 2'}] },
    { id: 2, name: 'Amazon', subchannels: [{ id: 1, name: 'Sub 1'}] },
    { id: 3, name: 'Google', subchannels: [{ id: 1, name: 'Sub 1'}] },
    { id: 4, name: 'Microsoft', subchannels: [{ id: 1, name: 'Sub 1'}] },
    { id: 5, name: 'Facebook', subchannels: [{ id: 1, name: 'Sub 1'}] },
    { id: 6, name: 'Instagram' },
];

function Sidebar() {
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

    return (
        <aside className="w-80 bg-slate-900 text-white flex flex-col">
            <div className='flex justify-between items-center h-20 border-b border-slate-700 p-4'>
                <img src={logo} width={100} height={100} alt='Logo' />
            </div>
            <div class="p-4 flex flex-col grow">
                <div class="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Workspace</h2>
                    <FiMoreHorizontal className="h-5 w-5 text-slate-400" />
                </div>
                <div class="flex uppercase font-bold text-sm text-slate-300 mb-2">Projects</div>
                <div class="flex flex-col gap-2">
                    {channels.map(channel => (
                        <ChannelItem key={channel.id} channel={channel} />
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
