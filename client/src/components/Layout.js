import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ChannelDetails from "./ChannelDetails";

const initialChannels = [
  {
    id: 1,
    name: "Project 1",
    messages: [
      {
        id: 1,
        name: "Kevin",
        text: "Hey, can we have a quick chat about the progress of the ABC Project?",
        timestamp: "9:01 AM",
      },
      { id: 2, name: "Kevin", text: "Of course, what do you need to know?", timestamp: "9:02 AM" },
      { id: 3, name: "Kevin", text: "I was looking at the project tracker and I noticed that we're behind on a few key tasks. Specifically, the design phase is almost a week overdue. Do you know what's causing the delay?", timestamp: "9:03 AM" },
      { id: 4, name: "Kevin", text: "Yes, we had a few unexpected issues with the design. We realized our initial design didn't cater well to our mobile users, so we decided to pivot and redesign a significant part of the interface. It took longer than we anticipated, but I believe it's a worthy investment for the project's long-term success.", timestamp: "9:04 AM" },
      ],
    tasks: [
      { completed: true, text: "Design business card" },
      { completed: false, text: "Add interaction to website" },
      { completed: false, text: "Switch logo on website" },
      { completed: false, text: "Change brand colors" },
    ],
  },

  { id: 2, name: "Amazon", messages: [], tasks: [] },
  { id: 3, name: "Google", messages: [], tasks: [] },
  { id: 4, name: "Microsoft", messages: [], tasks: [] },
  { id: 5, name: "Facebook", messages: [], tasks: [] },
  { id: 6, name: "Instagram", messages: [], tasks: [] },
];

function Layout() {
  const [channels, setChannels] = useState(initialChannels);
  const [selectedChannelId, setSelectedChannelId] = useState(null); // Change to selectedChannelId

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
        messages: [],
        tasks: []
      };
      setChannels([...channels, newChannel]);
    } else {
      alert("Invalid or duplicate channel name");
    }
  };

  const handleDeleteChannel = (channelId) => {
    setChannels(channels.filter((channel) => channel.id !== channelId));
    if (selectedChannelId === channelId) {
      setSelectedChannelId(null);
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
    setSelectedChannelId(channel.id); // Store only the channel id
  };

  const handleSendMessage = (channelId, text) => {
    setChannels((prevChannels) => {
      return prevChannels.map((channel) => {
        if (channel.id === channelId) {
          const timestamp = new Date().toLocaleString();
          const newMessage = {
            id: (channel.messages?.length || 0) + 1,
            text: text,
            timestamp: timestamp,
          };
          return {
            ...channel,
            // Ensure a new object is created for the updated channel
            messages: [...(channel.messages || []), newMessage],
          };
        }
        // Create a new object for all channels to ensure a re-render
        return { ...channel };
      });
    });
  };

  // Derive the selectedChannel from channels and selectedChannelId
  const selectedChannel = channels.find(
    (channel) => channel.id === selectedChannelId
  );

  const handleAddTask = (channelId, taskText) => {
    const updatedChannels = channels.map((channel) => {
      if (channel.id === channelId) {
        const newTask = { text: taskText, completed: false };
        return { ...channel, tasks: [...channel.tasks, newTask] };
      }
      return channel;
    });
    setChannels(updatedChannels);
  };

  function handleCheckTask(channelId, taskIndex) {
    setChannels((prevChannels) => {
      return prevChannels.map((channel) => {
        if (channel.id === channelId) {
          const newTasks = [...channel.tasks];
          console.log("Old Task:", newTasks[taskIndex]);
          newTasks[taskIndex] = {
            ...newTasks[taskIndex],
            completed: !newTasks[taskIndex].completed,
          };
          console.log("New Task:", newTasks[taskIndex]);
          return { ...channel, tasks: newTasks };
        }
        return channel;
      });
    });
  }

  const handleConvertToTask = (channelId, taskText) => {
    const updatedChannels = channels.map((channel) => {
      if (channel.id === channelId) {
        const newTask = { text: taskText, completed: false };
        return { ...channel, tasks: [...channel.tasks, newTask] };
      }
      return channel;
    });
    setChannels(updatedChannels);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        channels={channels}
        addChannel={addChannel}
        handleDeleteSubchannel={handleDeleteSubchannel}
        handleDeleteChannel={handleDeleteChannel}
        onSelectChannel={handleSelectChannel}
      />
      <div className="flex flex-col flex-grow">
        <Topbar />
        <ChannelDetails
          channel={selectedChannel}
          handleDeleteChannel={handleDeleteChannel}
          handleSendMessage={handleSendMessage}
          handleAddTask={handleAddTask}
          handleCheckTask={handleCheckTask}
          handleConvertToTask={handleConvertToTask}
        />
      </div>
    </div>
  );
}

export default Layout;
