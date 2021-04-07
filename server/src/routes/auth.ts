import express from "express";
import Auth from "../controller/auth";

const auth = express.Router();

auth.post("/login", Auth.login);
auth.post("/register", Auth.register);
auth.get("/users", Auth.allUsers);

export default auth;
