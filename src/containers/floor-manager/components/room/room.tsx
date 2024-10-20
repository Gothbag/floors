import { ChangeEvent } from 'react';

import { IRoom } from '../../../../types/rooms';

interface Props {
  enableRoomEditMode: (floorIndex: number, roomIndex: number) => void;
  room: IRoom;
  roomIndex: number;
  selectedFloor: number;
  removeRoom: (floorIndex: number, roomIndex: number) => void;
  updateRoom: (floorIndex: number, roomIndex: number, updatedRoom: Partial<IRoom>) => void;
}

const Room = ({
  enableRoomEditMode,
  removeRoom,
  room,
  roomIndex,
  selectedFloor,
  updateRoom
}: Props) => {

  const handleChangeCapacity = (e: ChangeEvent<HTMLInputElement>) =>
    updateRoom(selectedFloor - 1, roomIndex, { maxCapacity: Number(e.target.value) })

  const handleChangeOccupation = (e: ChangeEvent<HTMLInputElement>) =>
    updateRoom(selectedFloor - 1, roomIndex, { occupation: Number(e.target.value) })

  const handleRemoveRoom = () => removeRoom(selectedFloor - 1, roomIndex);

  const handleEnableRoomEditMode = () => enableRoomEditMode(selectedFloor - 1, roomIndex);

  return (
    <div key={room.id} className="room">
      <div className="room-content">
        <h3>{room.name}</h3>
        <div className="input-container">
          <label>Capacidad máxima</label>
          <input
            type="number"
            disabled={!room.isEditEnabled}
            value={room.maxCapacity}
            onChange={handleChangeCapacity}
          />
        </div>
        <div className="input-container">
          <label>Ocupación</label>
          <div className="input-percent">
            <input
              type="number"
              disabled={!room.isEditEnabled}
              value={room.occupation}
              onChange={handleChangeOccupation}
            />
            <span>%</span>
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleRemoveRoom}>
            Eliminar
          </button>
          <button onClick={handleEnableRoomEditMode}>
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;