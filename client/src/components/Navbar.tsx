import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

interface Props {}

export default function Navbar({}: Props): ReactElement {
  return (
    <nav className='w-100 z-50'>
      <div className="container mx-auto flex justify-center">
        <Link className='mx-3 font-bold' to="/login">Login</Link>
        <Link className='mx-3 font-bold' to="/register">Register</Link>
        <Link className='mx-3 font-bold' to="/rooms">Rooms</Link>
        <Link className='mx-3 font-bold' to="/home">Home</Link>
        <button onClick={logout} className='mx-3 font-bold'>logout</button>
      </div>
    </nav>
  );
}
