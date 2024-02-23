// import express, { Application, Request, Response } from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./databases";
// import helmet from "helmet";
// import morgan from "morgan";
// import cors from "cors";
// import { errorHandler } from "./middlewares";
// import { AuthRouter, ProtectedRouter, PublicRouter } from "./routes";

// dotenv.config();

// class Server {
//   private app: Application;
//   private port: number;

//   constructor() {
//     this.app = express();
//     this.port = parseInt(process.env.PORT || "8000");
//     this.setup();
//   }

//   private setup(): void {
//     this.app.use(helmet());
//     this.app.use(cors());
//     this.app.use(express.json());
//     this.app.use(express.urlencoded({ extended: true }));
//     this.app.use(morgan("dev"));

//     this.app.use("/", PublicRouter);
//     this.app.use("/auth", AuthRouter);
//     this.app.use("/auth", ProtectedRouter);

//     this.app.use(errorHandler);
//   }

//   public async start(): Promise<void> {
//     await connectDB();

//     this.app.listen(this.port, () => {
//       console.log(`Server is running on http://localhost:${this.port}`);
//     });
//   }
// }

// export { Server }

import express, { Application } from "express";
import dotenv from "dotenv";
import { connectDB } from "./databases";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares";
import { AuthRouter, ProtectedRouter, PublicRouter } from "./routes";

dotenv.config();

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "8000");
    this.setupMiddlewares();
    this.connectDB();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }
  
  private async connectDB(): Promise<void> {
    await connectDB();
  }

  private setupRoutes(): void {
    this.app.use("/", PublicRouter);
    this.app.use("/auth", AuthRouter);
    this.app.use("/auth", ProtectedRouter);
  }
  
  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export { Server };