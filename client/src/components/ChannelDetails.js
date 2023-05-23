import React from 'react';
import { FiUserPlus, FiTrash, FiMoreHorizontal } from 'react-icons/fi';

function ChannelDetails({ channel, handleDeleteChannel }) {
  if (!channel) {
    return (
      <div className="p-4">
        <p>Select a channel to view details</p>
      </div>
    );
  }

  const onDeleteClick = (event) => {
    event.stopPropagation();
    handleDeleteChannel(channel.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h1 className="text-xl">{channel.name}</h1>
        <div className="flex items-center gap-4 text-slate-500">
          <FiUserPlus className="icon-md" />
          <FiTrash className="icon-md" onClick={onDeleteClick} />
          <FiMoreHorizontal className="icon-md" />
        </div>
      </div>
      
      <div className="subchannel-wrapper hidden">
        <h2 className="text-xl">Subchannels</h2>
        {channel.subchannels && channel.subchannels.length > 0 && channel.subchannels.map(subchannel => (
          <div key={subchannel.id}>{subchannel.name}</div>
        ))}
      </div>
    </div>
  );
}

export default ChannelDetails;