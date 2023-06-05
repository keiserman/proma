import React, { useState } from "react";
import TaskList from "./TaskList";
import Chat from "./Chat";
import {
  MdDeleteOutline,
  MdOutlineArchive,
  MdOutlinePersonAdd,
  MdOutlineMoreHoriz,
} from "react-icons/md";

function ChannelDetails({
  channel,
  handleDeleteChannel,
  handleSendMessage,
  handleAddTask,
  handleCheckTask,
  handleConvertToTask,
}) {
  const [messageInput, setMessageInput] = useState("");
  const [taskInput, setTaskInput] = useState("");

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
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return; // Don't send empty messages
    handleSendMessage(channel.id, messageInput);
    setMessageInput(""); // Clear the input field
  };

  const onTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return; // Don't add empty tasks
    handleAddTask(channel.id, taskInput);
    setTaskInput(""); // Clear the input field
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h1 className="text-xl">{channel.name}</h1>
        <div className="flex items-center gap-4 text-slate-500">
          <MdOutlinePersonAdd className="icon-md" />
          <MdOutlineArchive className="icon-md" />
          <MdDeleteOutline className="icon-md" onClick={onDeleteClick} />
          <MdOutlineMoreHoriz className="icon-md bg-slate-200 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 flex-grow">
        <Chat
          channelId={channel.id}
          messages={channel.messages}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          onSubmit={onSubmit}
          handleConvertToTask={handleConvertToTask}
        />

        <TaskList
          channelId={channel.id}
          tasks={channel.tasks || []}
          onTaskSubmit={onTaskSubmit}
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          handleCheckTask={handleCheckTask}
        />
      </div>
    </div>
  );
}

export default ChannelDetails;
