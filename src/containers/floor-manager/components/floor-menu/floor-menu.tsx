import { ChangeEvent } from 'react';

interface Props {
  addRoom: (floorIndex: number) => void;
  maxCapacityFilter?: number;
  occupationFilter?: number;
  selectedFloor: number;
  setMaxCapacityFilter: (value: React.SetStateAction<number | undefined>) => void
  setOccupationFilter: (value: React.SetStateAction<number | undefined>) => void
}

const Room = ({
  addRoom,
  maxCapacityFilter,
  occupationFilter,
  selectedFloor,
  setMaxCapacityFilter,
  setOccupationFilter,
}: Props) => {
  const handleAddRoom = () => addRoom(selectedFloor - 1);

  const handleSetMaxCapacityFilter = (e: ChangeEvent<HTMLInputElement>) =>
    setMaxCapacityFilter(e.target.value ? Number(e.target.value) : undefined);

  const handleSetOccupationFilter = (e: ChangeEvent<HTMLInputElement>) =>
    setOccupationFilter(e.target.value ? Number(e.target.value) : undefined);

  return (
    <div className="floor-menu">
      <button onClick={handleAddRoom}>Añadir sala</button>
      <input
        type="number"
        id="maxCapacity"
        value={maxCapacityFilter || ''}
        onChange={handleSetMaxCapacityFilter}
        placeholder="Capacidad máxima >="
      />
      <input
        type="number"
        id="occupation"
        value={occupationFilter || ''}
        onChange={handleSetOccupationFilter}
        placeholder="Ocupación (%) <="
      />
    </div>
  );
}

export default Room;