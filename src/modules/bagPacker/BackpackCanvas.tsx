export default function BackpackCanvas({ onDrop, packedItemIds }: any) {
  const handleDrop = (e: any) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("item-id");
    if (itemId) {
      onDrop(itemId);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative w-full h-[500px] border-4 border-dashed border-blue-300 rounded bg-[url('/backpack.png')] bg-center bg-no-repeat bg-contain"
    >
      <div className="absolute bottom-0 left-0 p-2">
        <h3 className="text-white font-bold">Packed:</h3>
        <ul className="text-white">
          {packedItemIds.map((id: string) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
