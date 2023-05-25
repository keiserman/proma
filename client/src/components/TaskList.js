import React from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

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
              className="icon-md text-slate-500"
              onClick={() => {
                console.log("Checkbox clicked", channelId, index);
                handleCheckTask(channelId, index);
              }}
            />
          ) : (
            <MdCheckBoxOutlineBlank
              className="icon-md text-slate-500"
              onClick={() => {
                console.log("Checkbox clicked", channelId, index);
                handleCheckTask(channelId, index);
              }}
            />
          )}
          <span className={task.completed ? "line-through" : ""}>
            {task.text}
          </span>
        </div>
      ))}

      <form onSubmit={onTaskSubmit}>
        <input
          type="text"
          className="task-input"
          placeholder="Add a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskList;
