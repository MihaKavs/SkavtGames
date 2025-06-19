export default function DraggableItem({ item }: any) {
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("item-id", item.id);
  };

  return (
    <div
      className="border p-2 rounded shadow cursor-grab bg-white"
      draggable
      onDragStart={handleDragStart}
    >
      {item.label}
    </div>
  );
}
