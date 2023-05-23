import React, { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs'; 
import { FiTrash, FiChevronDown} from "react-icons/fi";

function ChannelItem({ channel, handleDeleteSubchannel, handleDeleteChannel, onSelectChannel }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleSelect = () => {
    onSelectChannel(channel);
  }

  return (
    <>
      <div
        className="flex justify-between items-center py-2 px-4 rounded bg-slate-800 hover:bg-slate-700 cursor-pointer"
        onClick={handleSelect}
      >
        <div className="flex items-center">
          <BsCircleFill className="h-2 w-2 mr-3 text-slate-400" />
          <span className='text-slate-300 font-semibold'>{channel.name}</span>
        </div>
        <div className='flex' onClick={(e) => e.stopPropagation()}>
          {channel.subchannels && channel.subchannels.length > 0 && (
            <FiChevronDown
              className={`icon-md transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              onClick={handleDropdown}
            />
          )}
        </div>
      </div>
      {isOpen && channel.subchannels && channel.subchannels.length > 0 && (
        <div className="text-left">
          {channel.subchannels.map(subchannel => (
            <div key={subchannel.id} className="py-1 px-4 rounded flex items-center justify-between hover:bg-slate-800 cursor-pointer">
                <div className="flex items-center">
                  <BsCircleFill className="h-2 w-2 mr-3 text-slate-400" />
                  <span>{subchannel.name}</span>
                </div>
                <FiTrash className="icon-md text-slate-400" onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSubchannel(channel.id, subchannel.id);
                }} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ChannelItem;
