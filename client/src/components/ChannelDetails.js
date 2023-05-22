import React from 'react';

function ChannelDetails({ channel }) {
  if (!channel) {
    return (
      <div className="p-4">
        <p>Select a channel to view details</p>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{channel.name}</h1>
      <h2 className="text-xl">Subchannels</h2>
      {channel.subchannels && channel.subchannels.length > 0 && channel.subchannels.map(subchannel => (
        <div key={subchannel.id}>{subchannel.name}</div>
      ))}
    </div>
  );
}

export default ChannelDetails;
