import { useCallback, useState } from 'react';

import { IRoom } from '../../../types/rooms';

interface UseRoomsParams {
  maxCapacityFilter?: number;
  occupationFilter?: number;
  selectedFloor: number;
}

const useRooms = ({ maxCapacityFilter, occupationFilter, selectedFloor }: UseRoomsParams) => {
  const [rooms, setRooms] = useState<IRoom[][]>([
    [{ id: 1, name: 'Sala planta 1', maxCapacity: 10, occupation: 0, isEditEnabled: false }],
    [{ id: 2, name: 'Sala planta 2', maxCapacity: 10, occupation: 0, isEditEnabled: false }],
    [{ id: 3, name: 'Sala planta 3', maxCapacity: 10, occupation: 0, isEditEnabled: false }],
  ]);

  const addRoom = useCallback((floorIndex: number): void => {
    const newRoom: IRoom = {
      id: rooms[floorIndex].length + 1,
      name: `Sala planta ${floorIndex + 1}`,
      maxCapacity: 10,
      occupation: 0,
      isEditEnabled: false,
    };
    const updatedRooms = [...rooms];
    updatedRooms[floorIndex] = [...updatedRooms[floorIndex], newRoom];
    setRooms(updatedRooms);
  }, [rooms]);

  const updateRoom = useCallback((floorIndex: number, roomIndex: number, updatedRoom: Partial<IRoom>): void => {
    const updatedRooms = [...rooms];
    updatedRooms[floorIndex][roomIndex] = {
      ...updatedRooms[floorIndex][roomIndex],
      ...updatedRoom,
    };
    setRooms(updatedRooms);
  }, [rooms]);

  const removeRoom = useCallback((floorIndex: number, roomIndex: number): void => {
    const updatedRooms = [...rooms];
    updatedRooms[floorIndex] = updatedRooms[floorIndex].filter((_, index) => index !== roomIndex);
    setRooms(updatedRooms);
  }, [rooms]);

  const enableRoomEditMode = useCallback((floorIndex: number, roomIndex: number): void => {
    const updatedRooms = [...rooms];
    updatedRooms[floorIndex][roomIndex] = {
      ...updatedRooms[floorIndex][roomIndex],
      isEditEnabled: !updatedRooms[floorIndex][roomIndex].isEditEnabled,
    };
    setRooms(updatedRooms);
  }, [rooms]);

  const filteredRooms = rooms[selectedFloor - 1]?.filter((room) => {
    const matchesMaxCapacity =
      maxCapacityFilter === undefined || room.maxCapacity >= maxCapacityFilter;
    const matchesOccupation =
      occupationFilter === undefined || room.occupation <= occupationFilter;
    return matchesMaxCapacity && matchesOccupation;
  });

  return {
    addRoom,
    enableRoomEditMode,
    filteredRooms,
    floors: rooms,
    removeRoom,
    updateRoom,
  };
};

export default useRooms;
