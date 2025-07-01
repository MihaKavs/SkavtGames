import React from "react";

type Item = {
  id: string;
  name: string;
  icon: string;
  rows: number;
  columns: number;
  color: string;
  amount: number;
};

type ItemListProps = {
  items: Item[];
  cellSize?: number; // For scaling the preview properly
};

export default function ItemList({ items, cellSize = 20 }: ItemListProps) {
  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData("text/plain", item.id);

    // Create drag preview element
    const preview = document.createElement("div");
    preview.style.width = `${item.columns * cellSize}px`;
    preview.style.height = `${item.rows * cellSize}px`;
    preview.style.backgroundColor = item.color;
    preview.style.opacity = "0.8";
    preview.style.border = "2px dashed black";
    preview.style.display = "flex";
    preview.style.alignItems = "center";
    preview.style.justifyContent = "center";
    preview.style.fontSize = "16px";
    preview.style.color = "white";
    preview.innerText = item.icon;

    document.body.appendChild(preview);
    e.dataTransfer.setDragImage(preview, 0, 0);

    // Remove preview after drag starts
    setTimeout(() => document.body.removeChild(preview), 0);
  };

  return (
    <div className="packer-items">
      <h3 className="list-packer-title">Predmeti</h3>
      <div className="list-container">
        {items.map((item) => (
          <div
            key={item.id}
            draggable={item.amount > 0}
            onDragStart={(e) => handleDragStart(e, item)}
            className="item-container"
            style={{
              opacity: item.amount > 0 ? 1 : 0.5,
              cursor: item.amount > 0 ? "grab" : "not-allowed",
              backgroundColor: item.color,
            }}
          >
            {item.icon} {item.name} ×{item.amount}
          </div>
        ))}
      </div>
    </div>
  );
}
