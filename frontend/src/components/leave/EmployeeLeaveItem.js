import React, { useState } from "react";
import Dropdown from "../common/Dropdown";
import DraggableItem from "../common/DraggableItem";
import Button from "../common/Button";
import { useDrag } from "react-dnd";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const EmployeeLeaveItem = React.forwardRef(
  (
    {
      employee,
      leave,
      editLeave,
      deleteLeave,
      leaveDays,
      leaveDateToStr,
      onSaveComment,
    },
    ref
  ) => {
    const [comment, setComment] = useState(leave.comment || "");
    const [isCommentSaved, setIsCommentSaved] = useState(false);
    const [{ isDragging }, drag] = useDrag({
      type: "leave",
      item: { id: leave._id, leave },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    const handleSaveComment = () => {
      onSaveComment(leave._id, comment);
      setIsCommentSaved(true);
      setTimeout(() => {
        setIsCommentSaved(false);
      }, 3000);
    };

    return (
      <>
        <DraggableItem
          ref={drag(ref)}
          type="leave"
          item={{ id: leave._id, leave }}
          className={`p-2 shadow-md rounded flex self-start ${employee.color}`}
        >
          <div className="flex flex-col items-start ml-2">
            <div>
              <span>
                {employee.lastName} {employee.firstName}
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                {leaveDays} day{leaveDays > 1 ? "s" : ""}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {leaveDateToStr}
            </div>
          </div>
          <div className="flex flex-col items-start ml-2">
            {/* Edit/Delete actions */}
            <Dropdown
              options={[
                { label: "Edit", onClick: editLeave },
                { label: "Delete", onClick: deleteLeave, danger: true },
              ]}
            />

            {/* Comment action */}
            <Dropdown icon={faComment} title="Add a comment">
              <div
                className="p-2"
                draggable
                onDragStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                  rows={4}
                  placeholder="Add a comment..."
                />
                <div className="mt-1 flex justify-end items-center space-x-2">
                  {isCommentSaved && (
                    <span className="text-green-700 dark:text-green-500 text-sm">
                      Saved !
                    </span>
                  )}
                  <Button
                    onClick={handleSaveComment}
                    className="rounded"
                    label="Save"
                    size="sm"
                  />
                </div>
              </div>
            </Dropdown>
          </div>
        </DraggableItem>
      </>
    );
  }
);

export default EmployeeLeaveItem;
