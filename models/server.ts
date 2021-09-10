import cors from "cors";
import express, { Application } from "express";
import db from "../db/connection";
import routerUsers from "../routes/users.routes";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    //Connection DB
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Rutas de la aplicación
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DB Connected");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parseo y lectura body
    this.app.use(express.json());

    // Directorio Publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, routerUsers);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server run in the port", this.port);
    });
  }
}

export default Server;
