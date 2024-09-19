import React, { useState } from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ type, item, children, className }) => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type,
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: () => setIsGrabbing(false),
  });

  const handleMouseDown = () => setIsGrabbing(true);
  const handleMouseUp = () => setIsGrabbing(false);

  return (
    <div
      ref={drag}
      className={`${className} ${isDragging ? "opacity-50" : "opacity-100"} ${
        isGrabbing ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
