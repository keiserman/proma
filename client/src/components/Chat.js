import React from "react";
import Messages from "./Messages";
import { MdSend } from "react-icons/md";

function Chat({ channelId, messages, messageInput, setMessageInput, onSubmit, handleConvertToTask }) {
  return (
    <div className="chat-wrapper text-left p-4">
      <Messages channelId={channelId} messages={messages} onConvertToTask={handleConvertToTask} />
      <form
        onSubmit={onSubmit}
        className="flex justify-start items-center gap-2 rounded"
      >
        <input
          type="text"
          className="px-4 py-2 rounded border border-slate-200 mb-2 focus:ring-0 grow"
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
  );
}

export default Chat;