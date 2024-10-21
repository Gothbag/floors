import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import useRooms from './hooks/use-rooms';

import Room from './components/room';
import FloorMenu from './components/floor-menu';

import './floor-manager.scss';

const RoomManager: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [maxCapacityFilter, setMaxCapacityFilter] = useState<number | undefined>(undefined);
  const [occupationFilter, setOccupationFilter] = useState<number | undefined>(undefined);

  const {
    addRoom,
    enableRoomEditMode,
    filteredRooms,
    floors,
    removeRoom,
    updateRoom,
  } = useRooms({ maxCapacityFilter, occupationFilter, selectedFloor });

  return (
    <div className="room-manager">
      <h1>Salas</h1>
      <div className="floor-selector">
        <select
          id="floor"
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(Number(e.target.value))}
        >
          {floors.map((_: unknown, index: number) => (
            <option key={nanoid()} value={index + 1}>
              Planta {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="floor-container">
        <div className="floor-info">
          <h3 className="floor-title">Planta {selectedFloor}</h3>

          <FloorMenu
            addRoom={addRoom}
            maxCapacityFilter={maxCapacityFilter}
            occupationFilter={occupationFilter}
            selectedFloor={selectedFloor}
            setMaxCapacityFilter={setMaxCapacityFilter}
            setOccupationFilter={setOccupationFilter}
          />
        </div>

        <div className="room-list">
          {filteredRooms?.map((room, roomIndex) => (
            <Room
              key={room.id}
              enableRoomEditMode={enableRoomEditMode}
              removeRoom={removeRoom}
              room={room}
              roomIndex={roomIndex}
              selectedFloor={selectedFloor}
              updateRoom={updateRoom}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomManager;
