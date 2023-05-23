import React, { useState } from "react";
import {
  MdDeleteOutline,
  MdOutlineArchive,
  MdOutlinePersonAdd,
  MdOutlineMoreHoriz,
  MdSend,
} from "react-icons/md";

function ChannelDetails({ channel, handleDeleteChannel, handleSendMessage }) {
  const [messageInput, setMessageInput] = useState(""); // Add this line

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

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h1 className="text-xl">{channel.name}</h1>
        <div className="flex items-center gap-4 text-slate-500">
          <MdOutlinePersonAdd className="icon-md" />
          <MdOutlineArchive className="icon-md" />
          <MdDeleteOutline className="icon-md" onClick={onDeleteClick} />
          <MdOutlineMoreHoriz className="icon-md bg-slate-200 rounded-full" />
        </div>
      </div>

      <div className="text-left p-4">
        <div className="mb-4">
          {channel.messages &&
            channel.messages.map((message) => (
              <div key={message.id} className="py-1 flex gap-4">
                <div className="h-10 w-10 bg-slate-300"></div>
                <div class="flex flex-col">
                  <div className="flex gap-2">
                    <span className="text-slate-700 font-bold">Kevin</span>
                    <span className="text-slate-500">3:00 PM</span>
                  </div>
                  <div className="text-slate-600">{message.text}</div>
                </div>
              </div>
            ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-start rounded"
        >
          <input
            type="text"
            className="p-3 rounded border border-slate-200 mb-2"
            placeholder="Write your message here..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-sky-500 text-white rounded flex gap-2 self-start items-center hover:bg-sky-600"
          >
            Send
            <MdSend className="icon-sm" />
          </button>
        </form>
      </div>

      <div className="subchannel-wrapper hidden">
        <h2 className="text-xl">Subchannels</h2>
        {channel.subchannels &&
          channel.subchannels.length > 0 &&
          channel.subchannels.map((subchannel) => (
            <div key={subchannel.id}>{subchannel.name}</div>
          ))}
      </div>
    </div>
  );
}

export default ChannelDetails;
