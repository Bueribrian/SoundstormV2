import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoomService from "../services/rooms";

export default function Rooms() {
  const [rooms, setRooms]: any = useState([]);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await setRooms(await RoomService.getRooms());
      setLoaded(true);
    })();

    return () => {};
  }, []);

  const selectRoom = (roomId: string) => {
    RoomService.setRoom(roomId);
    history.push("/home");
  };

  return (
    <div className="container mx-auto h-max mt-32 flex items-center justify-center cursor-pointer flex-wrap">
      <h1 className='w-full text-xl font-bold text-center mb-12'>Rooms</h1>
      {Boolean(loaded)
        ? rooms && Boolean(rooms.data.length)
          ? rooms.data.map((room: any) => (
              <div
                className="bg-gray-900 mx-6 rounded-xl w-64 flex justify-center items-center h-64 p-5"
                onClick={() => selectRoom(room._id)}
                key={room._id}
              >
                <div className="bg-gray-800 flex items-center justify-center font-bold font-xl  bg-black h-full w-full">
                  {room.name}
                </div>
              </div>
            ))
          : "No hay salas"
        : "Cargando..."}
    </div>
  );
}
