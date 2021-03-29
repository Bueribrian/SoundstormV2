import React, { useEffect, useState } from "react";
import RoomService from "../services/rooms";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      setRooms(await RoomService.getRooms());
    })();

    return () => {};
  }, []);

  return <div>
      {rooms.map(room => <div>Room</div>)}
  </div>;
}
