import React from "react";
import logo from "../proma-logo.svg";
import ChannelItem from "./ChannelItem";
import { MdOutlineAddCircleOutline, MdOutlineMoreHoriz } from 'react-icons/md';

function Sidebar({
  channels,
  addChannel,
  handleDeleteSubchannel,
  handleDeleteChannel,
  onSelectChannel,
}) {
  return (
    <aside className="bg-slate-900 text-white flex flex-col">
      <div className="flex justify-between items-center h-20 border-b border-slate-700 p-4">
        <img src={logo} width={100} height={100} alt="Logo" />
      </div>
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Workspace</h2>
          <MdOutlineMoreHoriz className="icon-md bg-slate-800 text-slate-300 rounded-full" />
        </div>
        <div className="flex uppercase font-bold text-sm text-slate-300 mb-2">
          Projects
        </div>
        <div className="flex flex-col gap-2">
          {channels.map((channel) => (
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
      <button
        className="w-full mt-4 p-6 hover:bg-slate-800 border-t border-slate-700 text-white inline-flex items-center justify-center"
        onClick={addChannel}
      >
        <MdOutlineAddCircleOutline className="icon-md mr-2" />
        Add Channel
      </button>
    </aside>
  );
}

export default Sidebar;
