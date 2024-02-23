import { Request, Response, Router } from "express";

const PublicRouter = Router();

PublicRouter.post("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});

export { PublicRouter }