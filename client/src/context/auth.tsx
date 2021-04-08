import React, { createContext, useState } from "react";
import { getUser } from "../services/auth";

const AuthContext: any = createContext(null);
const AuthDispatch: any = createContext(null);

export default function Auth({ children }: any) {
  const [user, setUser] = useState(getUser());

  return (
    <AuthContext.Provider value={{ user }}>
      <AuthDispatch.Provider value={{ setUser }}>
        {children}
      </AuthDispatch.Provider>
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthDispatch };
