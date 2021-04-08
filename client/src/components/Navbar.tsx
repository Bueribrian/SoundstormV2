import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import { AuthContext } from "../context/auth";
import { logout } from "../services/auth";


export default function Navbar(): ReactElement {
  const AuthState: any = useContext(AuthContext);

  if (Boolean(AuthState.user)) {
    return (
      <div className="container mx-auto py-5">
        <button className="mx-3 font-bold bg-red-500 text-white px-3 py-2 rounded" onClick={logout}>Logout</button>
        <Link className="mx-3 font-bold" to="/rooms">
            Rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-5">
      <Link className="mx-3 font-bold" to="/login">
        Login
      </Link>
      <Link className="mx-3 font-bold" to="/register"></Link>
      Register
    </div>
  );
}
