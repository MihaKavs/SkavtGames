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
  cellSize?: number;
  onItemSelect?: (id: string) => void;
  selectedItemId?: string | null; // Add prop for selected item
};

export default function ItemList({
  items,
  cellSize = 20,
  onItemSelect,
  selectedItemId,
}: ItemListProps) {
  const handleTouchStart = (e: React.TouchEvent, item: Item) => {
    e.preventDefault();
    if (item.amount > 0 && onItemSelect) {
      onItemSelect(item.id);
    }
  };

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    if (item.amount > 0) {
      e.dataTransfer.setData("text/plain", item.id);
      const preview = document.createElement("div");
      preview.style.width = `${item.columns * cellSize}px`;
      preview.style.height = `${item.rows * cellSize}px`;
      preview.style.backgroundColor = item.color;
      preview.style.opacity = "0.8";
      preview.style.border = "2px dashed black";
      preview.style.display = "flex";
      preview.style.alignItems = "center";
      preview.style.justifyContent = "center";
      preview.style.fontSize = `${cellSize * 0.8}px`;
      preview.style.color = "white";
      preview.innerText = item.icon;
      document.body.appendChild(preview);
      e.dataTransfer.setDragImage(preview, 0, 0);
      setTimeout(() => document.body.removeChild(preview), 0);
    }
  };

  return (
    <div className="packer-items">
      <h3 className="list-packer-title">Predmeti</h3>
      <div className="list-container">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => item.amount > 0 && onItemSelect?.(item.id)}
            onTouchStart={(e) => handleTouchStart(e, item)}
            draggable={item.amount > 0}
            onDragStart={(e) => handleDragStart(e, item)}
            className="item-container"
            style={{
              opacity: item.amount > 0 ? 1 : 0.5,
              cursor: item.amount > 0 ? "pointer" : "not-allowed",
              backgroundColor: item.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: `${cellSize * 0.8}px`,
              border:
                onItemSelect && item.id === selectedItemId
                  ? "2px solid blue"
                  : "1px solid #333",
            }}
          >
            {item.icon} {item.name} ×{item.amount}
          </div>
        ))}
      </div>
    </div>
  );
}
