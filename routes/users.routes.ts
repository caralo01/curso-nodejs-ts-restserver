import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/users.controller";

const routerUsers = Router();

routerUsers.get("/", getUsers);
routerUsers.get("/:id", getUser);
routerUsers.post("/", postUser);
routerUsers.put("/:id", putUser);
routerUsers.delete("/:id", deleteUser);

export default routerUsers;
