import { getUser } from "./auth";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

const RoomService = {
  getRooms: async () => {
    const user = getUser();
    if (!user) return alert("no estas loguead");
    const req = await fetch(`${BASE_URL}/rooms`, {
      headers: {
        Basic: user.token,
      },
    });
    const data = await req.json();
    console.log(data);
    return data;
  },

  setRoom: (roomId: string) => {
    localStorage.setItem("room", roomId);
  },
  getCurrentRoom: () => {
    let room = localStorage.getItem("room");
    if (room) return room;
    return false;
  },
};

export default RoomService;
