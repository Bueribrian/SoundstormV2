import express from "express";
import jwt from "jsonwebtoken";

const auth = express.Router();

let usersArr: object[] = [
  {
    id: 1,
    name: "brian",
    last_name: "bueri",
    email: "bbueri@the-8agency.com",
    password: "1234",
  },
];

// Get all auth
auth.post("/login", (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.json({ message: "Faltan campos por completar" }).status(202);
  }

  usersArr.find((user) => {
    if (user.email === email) {
      if (user.password === password) {
        let token = jwt.sign({ email,password }, process.env.JWT_SECRET);

        res
          .json({
            message: "Login successfully",
            data: { email, token },
            status: 200,
          })
          .status(200);
      } else {
        res
          .json({ message: "Contrasena incorrecta", data: {}, status: 404 })
          .status(404);
      }
    } else {
      res
        .json({
          message: "No existe usuario con ese email",
          data: {},
          status: 404,
        })
        .status(404);
    }
  });

  res
    .json({
      message: "Puede que algo haya salido mal 😔",
      data: {},
      status: 404,
    })
    .status(404);
});

// Get one room
auth.post("/register", (req, res) => {
  let { name, last_name, email, password } = req.body;

  if (!name || !last_name || !email || !password) {
    res.json({ message: "Faltan campos por completar" }).status(202);
  } else {
    usersArr.push({
      id: Math.round(Math.random() * 5000),
      name,
      last_name,
      email,
      password,
    });
  }

  res
    .json({
      message: "User created successfully!",
      user: { name, last_name, email },
      status: 200,
    })
    .status(200);
});

auth.get("/users", (req, res) => {
  res.json({ usersArr });
});

export default auth;
