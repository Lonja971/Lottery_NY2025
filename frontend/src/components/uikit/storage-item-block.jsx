import { useState } from "react";
import { CASES, RESOURCES } from "../constants";

export function ItemBlock({ type, resource, value, text, isComments }) {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  const handleMouseEnter = (event) => {
    const { clientX: x, clientY: y } = event;
    setTooltip({ visible: true, text, x, y });
  };

  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    setTooltip((prev) => ({ ...prev, x, y }));
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: "", x: 0, y: 0 });
  };

  const getTooltipStyle = () => {
    const tooltipWidth = 250;
    const tooltipHeight = 100;
    const padding = 20;

    const { x, y } = tooltip;

    let tooltipX = x + 20;
    let tooltipY = y + 20;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (tooltipX + tooltipWidth > windowWidth - padding) {
      tooltipX = x - tooltipWidth - 20;
    }

    if (tooltipY + tooltipHeight > windowHeight - padding) {
      tooltipY = y - tooltipHeight - 20;
    }

    if (tooltipY < padding) {
      tooltipY = y + 20;
    }

    if (tooltipX < padding) {
      tooltipX = x + 20;
    }

    return {
      position: "fixed",
      top: `${tooltipY}px`,
      left: `${tooltipX}px`,
      transform: "translate(0, 0)",
      zIndex: 1000,
    };
  };

  return (
    <>
      <div
        className="item__block itemsblock"
        onMouseEnter={isComments ? handleMouseEnter : null}
        onMouseMove={isComments ? handleMouseMove : null}
        onMouseLeave={isComments ? handleMouseLeave : null}
        style={{ display: 'inline-block' }}
      >
        <img src={`img/resources/${resource}.png`} alt="RES" />
        <div className="item__block-text">
          <div>
            <p className="_glass res-item-value">{Number(value).toLocaleString()}</p>
          </div>
          {type === "case" ? <p>{CASES[resource].name}</p> : <p>{RESOURCES[resource]}</p>}
        </div>
      </div>
      {tooltip.visible && (
        <span
          className="storage-tooltip _glass"
          style={getTooltipStyle()}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </>
  );
}