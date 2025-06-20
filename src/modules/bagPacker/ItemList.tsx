type GridBlockProps = {
  rows: number;
  columns: number;
  color: string;
  itemId: string;
};

const GridBlock = ({ rows, columns, color, itemId }: GridBlockProps) => {
  const totalCells = rows * columns;

  const handleDragStart = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ itemId, offsetX, offsetY })
    );
  };

  return (
    <div
      className="grid-block"
      draggable
      onDragStart={handleDragStart}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
        width: `${columns * 20}px`,
        height: `${rows * 20}px`,
        border: "1px solid #aaa",
      }}
    >
      {Array.from({ length: totalCells }, (_, i) => (
        <div
          key={i}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: color,
            border: "1px solid white",
            boxSizing: "border-box",
          }}
        />
      ))}
    </div>
  );
};

// items.ts
export const items = [
  {
    id: "sleeping_bag",
    name: "Sleeping Bag",
    icon: "🛏️",
    rows: 5,
    columns: 10,
    color: "gray",
  },
  {
    id: "t_shirt",
    name: "T-Shirt",
    icon: "👕",
    rows: 3,
    columns: 1,
    color: "green",
  },
];

const ItemList = () => {
  return (
    <div style={{ padding: "16px" }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "24px" }}>{item.icon}</div>
          <GridBlock
            itemId={item.id}
            rows={item.rows}
            columns={item.columns}
            color={item.color}
          />
          <div>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
