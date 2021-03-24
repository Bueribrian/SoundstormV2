const BASE_URL = process.env.REACT_APP_BASE_URL || "192.168.0.33:4000"
const RoomService = {

    getRooms: async () => {
        const req = await fetch(`${BASE_URL}/rooms`)
        const data = await req.json()
        return data
    }
}

export default RoomService