import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcrypt";

const Auth = {
  login: async (req, res) => {
    let { name, password } = req.body;
    console.log(name,password)
    if (!name || !password) {
      return res.json({ message: "Faltan campos por completar",data:{},status:202 }).status(202);
    }

    let user = await User.findOne({ name: name });

    if (!user) {
      return res.json({
        message: "El usuario no existe",
        data: {},
        status: 404,
      }).s;
    }
    let passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      let token = jwt.sign(
        { name: user.name, role: user.role },
        process.env.JWT_SECRET
      );

      return res
        .json({
          message: "Login OK!",
          data: {
            name: user.name,
            token,
          },
          status: 200,
        })
        .status(200);
    } else {
      res
        .json({
          message: "Password o nombre de usuario incorrecto",
          data: {},
          status: 400,
        })
        .status(400);
    }
  },
  register: async (req, res) => {
    let { name, password } = req.body;

    if (!name || !password) {
      return res
        .json({ message: "Faltan campos por completar", data: {}, status: 202 })
        .status(202);
    } else {
      let userExist = await User.findOne({ name: name });
      console.log(userExist);
      if (!userExist) {
        let userCreated = await User.create({ name, password });
        if (userCreated) {
          return res
            .json({
              message: "Usuario creado con exito",
              data: { name: userCreated.name },
              status: 200,
            })
            .status(200);
        }
      } else {
        return res
          .json({
            message: "Usuario ya existe",
            data: {},
            status: 200,
          })
          .status(404);
      }
    }
    return res
      .json({
        message: "Hay un problema al crear al usuario, intente mas tarde",
        data: {},
        status: 200,
      })
      .status(200);
  },
  allUsers: async (req, res) => {
    let users = await User.find();
    res
      .json({
        message: "Users",
        users,
        status: 202,
      })
      .status(202);
  },
  credentialsRequired: async (req, res, next) => {
    let token = req.header("Basic");
    if (token) {
      try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        return next();
      } catch (err) {
        return res
          .json({ message: "Error de credenciales", data: {}, status: 401 })
          .status(401);
      }
    } else {
      res
        .json({
          message: "Necesitas un token para realizar esta operacion",
          data: {},
          status: 401,
        })
        .status(401);
    }
  },
  adminCredentials: async (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res
        .json({
          message:
            "Se necesitan credenciales de administrador para esta operacion",
          data: {},
          status: 401,
        })
        .status(401);
    }

    return next();
  },
};

export default Auth;
