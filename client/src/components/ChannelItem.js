import React, { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs'; 
import { FiTrash, FiChevronDown} from "react-icons/fi";

function ChannelItem({ channel }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 px-4 rounded bg-slate-800 hover:bg-slate-700 cursor-pointer" onClick={handleDropdown}>
        <div className="flex items-center">
          <BsCircleFill className="h-2 w-2 mr-3 text-slate-400" />
          <span className='text-slate-300 font-semibold'>{channel.name}</span>
        </div>
        {channel.subchannels && (
          <FiChevronDown
            className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        )}
      </div>
      {isOpen && (
        <div className="text-left">
          {channel.subchannels.map(subchannel => (
            <div key={subchannel.id} className="py-1 px-4 rounded flex items-center justify-between hover:bg-slate-800 cursor-pointer">
                <div class="flex items-center">
                  <BsCircleFill className="h-2 w-2 mr-3 text-slate-400" />
                  <span>{subchannel.name}</span>
                </div>
                <FiTrash className="h-4 w-4 text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ChannelItem;