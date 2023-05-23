import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ChannelDetails from "./ChannelDetails";

const initialChannels = [
  {
    id: 1,
    name: "Apple",
    subchannels: [
      { id: 1, name: "Sub 1" },
      { id: 2, name: "Sub 2" },
    ],
    messages: [],
  },
  { id: 2, name: "Amazon", messages: [] },
  { id: 3, name: "Google", messages: [] },
  { id: 4, name: "Microsoft", messages: [] },
  { id: 5, name: "Facebook", messages: [] },
  { id: 6, name: "Instagram", messages: [] },
];

function Layout() {
  const [channels, setChannels] = useState(initialChannels);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const addChannel = () => {
    const newChannelName = window.prompt("Enter new channel name");

    if (
      newChannelName &&
      newChannelName.trim() !== "" &&
      !channels.some((channel) => channel.name === newChannelName)
    ) {
      const newChannel = {
        id: channels.length + 1,
        name: newChannelName,
      };
      setChannels([...channels, newChannel]);
    } else {
      alert("Invalid or duplicate channel name");
    }
  };

  const handleDeleteChannel = (channelId) => {
    setChannels(channels.filter((channel) => channel.id !== channelId));
    if (selectedChannel && selectedChannel.id === channelId) {
      setSelectedChannel(null);
    }
  };

  const handleDeleteSubchannel = (channelId, subchannelId) => {
    setChannels((prevChannels) => {
      return prevChannels.map((channel) => {
        if (channel.id === channelId) {
          return {
            ...channel,
            subchannels: channel.subchannels
              ? channel.subchannels.filter(
                  (subchannel) => subchannel.id !== subchannelId
                )
              : [],
          };
        }
        return channel;
      });
    });
  };

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
  };

  const handleSendMessage = (channelId, message) => {
    setChannels((prevChannels) => {
      const updatedChannels = prevChannels.map((channel) => {
        if (channel.id === channelId) {
          const updatedChannel = {
            ...channel,
            messages: [
              ...channel.messages,
              { id: Date.now(), text: message, timestamp: new Date() },
            ],
          };
          setSelectedChannel(updatedChannel);
          return updatedChannel;
        }
        return channel;
      });
      return updatedChannels;
    });
  };
  

  return (
    <div className="flex">
      <Sidebar
        channels={channels}
        addChannel={addChannel}
        handleDeleteSubchannel={handleDeleteSubchannel}
        handleDeleteChannel={handleDeleteChannel}
        onSelectChannel={handleSelectChannel}
      />
      <div className="flex-grow">
        <Topbar />
        <ChannelDetails
          channel={selectedChannel}
          handleDeleteChannel={handleDeleteChannel}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default Layout;
