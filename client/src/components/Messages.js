import React from "react";
import { MdOutlineRepeat } from "react-icons/md";

function Messages({ channelId, messages, onConvertToTask }) {
  return (
    <div className="mb-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="message py-1 flex gap-4 hover:bg-slate-50"
        >
          <div className="h-10 w-10 bg-slate-300 rounded"></div>
          <div className="flex flex-col grow">
            <div className="flex gap-2">
              <span className="text-slate-700 font-bold">Kevin</span>
              <span className="text-slate-500">{message.timestamp}</span>
            </div>
            <div className="text-slate-600">{message.text}</div>
          </div>
          <button onClick={() => onConvertToTask(channelId, message.text)}>
            <MdOutlineRepeat className="icon-md text-slate-400"/>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Messages;
