import React, { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import "../../../../frontend/src/css/draggable-window.css";

export function DraggableWindow({ id, title, setCloseConst, isActive, onFocus, onBlur, children }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      nodeRef.current.style.zIndex = 21;
    } else {
      nodeRef.current.style.zIndex = 20;
    }
  }, [isActive]);

  return (
    <Draggable handle=".dragwind__handle" nodeRef={nodeRef}>
      <div 
        ref={nodeRef}
        className="_glass dragwind"
        tabIndex={0}
        onFocus={() => onFocus(id)}
        onBlur={onBlur}
      >
        <div className="dragwind__handle _glass">
          <h3 className="dragwind__handle-text">{title}</h3>
          <div className="modal__close dragwind__handle-close" onClick={() => setCloseConst(false)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="dragwind__content">
          {children}
        </div>
      </div>
    </Draggable>
  );
}