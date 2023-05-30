import React from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdAddCircleOutline } from "react-icons/md";

function TaskList({
  channelId,
  tasks,
  onTaskSubmit,
  taskInput,
  setTaskInput,
  handleCheckTask,
}) {
  return (
    <div className="task-list tasks p-4 bg-slate-50 text-left flex flex-col gap-1">
      <h2 className="text-xl">Tasks</h2>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="task p-2 border border-slate-200 text-slate-700 bg-white rounded flex items-center gap-2"
        >
          {task.completed ? (
            <MdCheckBox
              className="icon-md text-slate-500 flex-none"
              onClick={() => {
                handleCheckTask(channelId, index);
              }}
            />
          ) : (
            <MdCheckBoxOutlineBlank
              className="icon-md text-slate-500 flex-none"
              onClick={() => {
                handleCheckTask(channelId, index);
              }}
            />
          )}
          <span className={task.completed ? "line-through" : ""}>
            {task.text}
          </span>
        </div>
      ))}

      <form onSubmit={onTaskSubmit} className="flex gap-2 mt-2">
        <input
          type="text"
          className="task-input p-2 grow bg-transparent border-b border-slate-300 focus:outline-none"
          placeholder="Add a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit"><MdAddCircleOutline className="icon-md text-slate-400"/></button>
      </form>
    </div>
  );
}

export default TaskList;
