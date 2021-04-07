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
    <div className='container mx-auto h-max mt-32 flex items-center justify-center '>
      {Boolean(loaded) ? (
        rooms && Boolean(rooms.data.length) ? (
          rooms.data.map((room: any) => (
            <div className='bg-black w-64 flex justify-center items-center h-64' onClick={() => selectRoom(room._id)} key={room._id}>
              {room.name}
            </div>))
        ) : (
          "No hay salas"
        )
      ) : (
        "Cargando..."
      )}
    </div>
  );
}
