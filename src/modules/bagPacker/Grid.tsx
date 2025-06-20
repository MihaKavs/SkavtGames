type PlacedItem = {
  id: string;
  itemId: string;
  row: number;
  column: number;
  rows: number;
  columns: number;
  color: string;
};
type GridProps = {
  rows: number;
  columns: number;
  cellSize: number;
  packedItems: PlacedItem[];
  onItemDrop: (itemId: string, row: number, column: number) => void;
};

const Grid = ({
  rows,
  columns,
  cellSize,
  packedItems,
  onItemDrop,
}: GridProps) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { itemId, offsetX, offsetY } = JSON.parse(
      e.dataTransfer.getData("application/json")
    );

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;

    const dropColumn = Math.floor(x / cellSize);
    const dropRow = Math.floor(y / cellSize);

    if (
      dropColumn >= 0 &&
      dropColumn < columns &&
      dropRow >= 0 &&
      dropRow < rows
    ) {
      onItemDrop(itemId, dropRow, dropColumn);
    }
  };

  return (
    <div
      className="grid-container"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        border: "2px solid #000",
        width: columns * cellSize,
        height: rows * cellSize,
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {Array.from({ length: rows * columns }, (_, i) => (
        <div
          key={i}
          className="grid-cell"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            boxSizing: "border-box",
            border: "1px solid #ccc",
          }}
        />
      ))}

      {/* Render placed items */}
      {packedItems.map((item) => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            top: item.row * cellSize,
            left: item.column * cellSize,
            width: item.columns * cellSize,
            height: item.rows * cellSize,
            backgroundColor: item.color,
            opacity: 0.8,
            border: "2px solid white",
            boxSizing: "border-box",
            pointerEvents: "none", // prevents overlap blocking new drops
          }}
        />
      ))}
    </div>
  );
};

export default Grid;
